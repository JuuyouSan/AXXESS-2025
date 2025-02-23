import torch
import torch.nn as nn
from torchvision import transforms
import torchvision.models as models

import os
from PIL import Image
import json
import re
from dotenv import load_dotenv

import openai

load_dotenv()

client = openai.OpenAI(
    api_key=os.environ.get("SAMBANOVA_API_KEY"),
    base_url="https://api.sambanova.ai/v1",
)


# ✅ Load the model architecture (without pre-trained classifier)
model = models.convnext_tiny(weights="IMAGENET1K_V1")

# ✅ Modify classifier for 22 skin disease classes
num_features = model.classifier[2].in_features
model.fc = nn.Sequential(
    nn.Flatten(),
    nn.Dropout(0.5),
    nn.Linear(num_features, 22)  # ✅ Only 22 classes instead of 1000
)

best_model_path = os.path.join(os.getcwd(), 'backend', 'model', 'best_model.pth')

# ✅ Move model to GPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ✅ Load the saved model
checkpoint = torch.load(best_model_path, map_location="cpu")

# ✅ Get current model state_dict keys
model_state_dict = model.load_state_dict(checkpoint)

# ✅ Move model to GPU
model.to(device)
model.eval()  # ✅ Set model to evaluation mode
torch.set_grad_enabled(False)

# ✅ Define class labels
classes = ['Acne', 'Actinic_Keratosis', 'Benign_tumors', 'Bullous', 'Candidiasis', 'DrugEruption', 
           'Eczema', 'Infestations_Bites', 'Lichen', 'Lupus', 'Moles', 'Psoriasis', 'Rosacea', 
           'Seborrh_Keratoses', 'SkinCancer', 'Sun_Sunlight_Damage', 'Tinea', 'Unknown_Normal', 
           'Vascular_Tumors', 'Vasculitis', 'Vitiligo', 'Warts']
classes.sort()

# ✅ Define preprocessing transforms
test_transforms = transforms.Compose([
    transforms.Resize((256, 256)),  # ✅ Resize to match model input
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def prompt_samba(message):
    system = """
You are an AI skin disease diagnosis assistant. You will be provided two lists that represent the output of a skin disease classifier. The first list contains the predicted skin disease names in order of likelihood, and the second list contains the corresponding confidence scores. For example:

["Eczema", "Psoriasis", "Rosacea", "Acne"][0.75, 0.70, 0.40, 0.15]

Please analyze these predictions and determine the most likely skin disease. If the top two predictions have similar confidence scores (within 5 percent of each other), then provide information for both conditions. For each condition, please provide:

A brief description of the skin disease (including common symptoms and characteristics).
A detailed, step-by-step set of recommendations on what to do next. Include at-home treatment suggestions if appropriate, and specify clear guidelines for when to seek medical advice (e.g., 'if the condition worsens or does not improve within X days, consult a doctor').
Your answer should help someone understand what the condition is, and what actionable steps they should take.

Your answer format should be the following:
{"description": "Brief Description", "nextSteps": ["1st step", "2nd step", ...]}

Do not output anything other than the provided format.
"""
    response = client.chat.completions.create(
    model="Meta-Llama-3.1-405B-Instruct",
    messages=[{"role":"system","content":system},{"role":"user","content":message}],
    temperature=0.1,
    top_p=0.1
    )

    return response.choices[0].message.content

# ✅ Function to predict a single image
def predict_image(image_path, model):
    image = Image.open(image_path).convert("RGB")  # ✅ Open image
    image = test_transforms(image).unsqueeze(0)  # ✅ Apply transforms & add batch dimension
    image = image.to(device)
    model.to(device)

    with torch.no_grad():  # ✅ No gradients needed for inference
        outputs = model(image)  # ✅ Get model predictions
        outputs = torch.squeeze(outputs)
        softmax = nn.Softmax(0)
        softmax_output = softmax(outputs)  # ✅ Get highest confidence class index

    _, top_indices = torch.topk(softmax_output, k=3)
    return softmax_output.tolist(), top_indices.tolist()

def get_confidence(confidences, top_indices):
    top_3 = [confidences[i] for i in top_indices]
    confidence_sum = sum(confidences)
    top_confidences = [top_3[i]/confidence_sum for i in range(3)]
    top_names = [classes[i] for i in top_indices]

    return top_names, top_confidences

def give_response(filename):
    cwd = os.getcwd()
    file_path = os.path.join(cwd, 'backend', 'uploads', filename)

    output, top_indices = predict_image(file_path, model)
    names, confidences = get_confidence(output, top_indices)
    prompt = str(names) + str(confidences)
    json_string = prompt_samba(prompt)
    json_data = json.loads(json_string)

    condition = str()
    confidence = float()
    if abs(confidences[0] - confidences[1]) <= 5:
        condition = names[0] + " " + names[1]
        condition = re.sub(r'_', ' ', condition)
        condition = re.sub(r'[^a-zA-Z0-9\s]', '', condition)
        condition = condition.title()
        confidence = confidences[0] + confidences[1]
    else:
        condition = names[0].title()
        condition = re.sub(r'_', ' ', condition)
        condition = re.sub(r'[^a-zA-Z0-9\s]', '', condition)
        confidence = confidences[0]
    confidence = round(confidence * 100, 1)

    result = {
            "condition": condition,
            "confidence": confidence,
            "description": json_data['description'],
            "nextSteps": json_data['nextSteps']
    }
    
    return result



print(give_response('08LichenPlanusTongue.jpeg'))