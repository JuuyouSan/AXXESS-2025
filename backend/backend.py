from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import os
from response import give_response

app = Flask(__name__)
CORS(app, resources={
    r"/upload": {
        "origins": ["http://localhost:3000"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Create uploads directory if it doesn't exist
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Hardcoded responses for each condition
CONDITION_RESPONSES = {
    "Eczema": {
        "condition": "Eczema",
        "description": "Eczema is a condition where patches of skin become inflamed, itchy, red, cracked, and rough.",
        "nextSteps": [
            "Keep the affected area moisturized",
            "Avoid known triggers (e.g., certain soaps, detergents, or foods)",
            "Consider using over-the-counter hydrocortisone cream",
            "Consult with a dermatologist for personalized treatment"
        ]
    },
    "Acne": {
        "condition": "Acne",
        "description": "Acne is a skin condition that occurs when hair follicles become plugged with oil and dead skin cells.",
        "nextSteps": [
            "Wash affected areas with a gentle cleanser",
            "Use over-the-counter acne products containing benzoyl peroxide or salicylic acid",
            "Avoid touching or picking at acne spots",
            "Consider consulting a dermatologist for severe cases"
        ]
    },
    "Psoriasis": {
        "condition": "Psoriasis",
        "description": "Psoriasis is a condition that causes skin cells to build up and form scales and itchy, dry patches.",
        "nextSteps": [
            "Keep skin moisturized and hydrated",
            "Use prescribed topical treatments as directed",
            "Consider phototherapy treatment",
            "Follow up with a dermatologist for ongoing management"
        ]
    },
    "Actinic_Keratosis": {
        "condition": "Actinic Keratosis",
        "description": "Actinic keratosis is a rough, scaly patch on the skin caused by long-term sun exposure, and it may be a precursor to skin cancer.",
        "nextSteps": [
            "Apply broad-spectrum sunscreen regularly",
            "Avoid excessive sun exposure and wear protective clothing",
            "Monitor the lesion for any changes",
            "Consult a dermatologist for evaluation and potential treatment (e.g., cryotherapy)"
        ]
    },
    "Benign_tumors": {
        "condition": "Benign Tumors",
        "description": "Benign tumors are non-cancerous growths on the skin that are generally harmless but may be removed for cosmetic reasons or if they cause discomfort.",
        "nextSteps": [
            "Monitor the growth for any changes in size or color",
            "Schedule regular skin check-ups",
            "Consult a dermatologist to assess if removal is necessary",
            "Consider a biopsy if recommended by a healthcare provider"
        ]
    },
    "Bullous": {
        "condition": "Bullous Disorders",
        "description": "Bullous disorders are characterized by the formation of blisters or bullae on the skin, which can be caused by various underlying conditions.",
        "nextSteps": [
            "Keep the affected area clean and protected",
            "Avoid known triggers that may exacerbate blistering",
            "Use prescribed medications or topical treatments as directed",
            "Seek medical advice for a proper diagnosis and treatment plan"
        ]
    },
    "Candidiasis": {
        "condition": "Candidiasis",
        "description": "Cutaneous candidiasis is a fungal infection that causes red, itchy rashes, typically in warm and moist areas of the body.",
        "nextSteps": [
            "Keep the affected areas dry and clean",
            "Apply over-the-counter antifungal creams as recommended",
            "Wear breathable clothing to reduce moisture buildup",
            "Consult a healthcare provider if the infection persists or worsens"
        ]
    },
    "DrugEruption": {
        "condition": "Drug Eruption",
        "description": "Drug eruption refers to adverse skin reactions resulting from medications, often presenting as rashes or hives.",
        "nextSteps": [
            "Identify and discontinue the offending medication if possible",
            "Consult a healthcare provider for alternative treatments",
            "Use topical treatments to relieve discomfort",
            "Monitor for any signs of severe allergic reaction or systemic involvement"
        ]
    },
    "Infestations_Bites": {
        "condition": "Infestations/Bites",
        "description": "This condition involves skin reactions resulting from insect bites or infestations, which can lead to irritation and localized inflammation.",
        "nextSteps": [
            "Clean the bite or affected area thoroughly",
            "Apply anti-itch creams or take antihistamines to reduce discomfort",
            "Avoid scratching to prevent secondary infections",
            "Seek medical advice if symptoms become severe or widespread"
        ]
    },
    "Lichen": {
        "condition": "Lichen Planus",
        "description": "Lichen planus is an inflammatory condition affecting the skin and mucous membranes, characterized by purplish, itchy, flat-topped bumps.",
        "nextSteps": [
            "Use prescribed topical corticosteroids to reduce inflammation",
            "Maintain good skin hygiene",
            "Avoid potential irritants that can worsen symptoms",
            "Consult a dermatologist for ongoing management and treatment options"
        ]
    },
    "Lupus": {
        "condition": "Cutaneous Lupus Erythematosus",
        "description": "Cutaneous lupus erythematosus is an autoimmune condition that affects the skin, leading to rashes, lesions, and increased sensitivity to sunlight.",
        "nextSteps": [
            "Avoid excessive sun exposure and apply sunscreen regularly",
            "Follow prescribed medication regimens",
            "Schedule regular appointments with a dermatologist",
            "Monitor for any systemic symptoms and report changes promptly"
        ]
    },
    "Moles": {
        "condition": "Moles",
        "description": "Moles are common skin growths that are usually benign; however, any changes in size, shape, or color should be monitored closely.",
        "nextSteps": [
            "Regularly inspect moles for any noticeable changes",
            "Use sunscreen to protect moles from harmful UV rays",
            "Consult a dermatologist for a professional evaluation",
            "Consider removal if advised for cosmetic or health reasons"
        ]
    },
    "Rosacea": {
        "condition": "Rosacea",
        "description": "Rosacea is a chronic skin condition characterized by facial redness, visible blood vessels, and sometimes small, red, pus-filled bumps.",
        "nextSteps": [
            "Avoid triggers such as spicy foods, alcohol, and extreme temperatures",
            "Use gentle skincare products designed for sensitive skin",
            "Apply sunscreen daily to protect the skin",
            "Consult a dermatologist for targeted treatment options"
        ]
    },
    "Seborrheic_Keratoses": {
        "condition": "Seborrheic Keratoses",
        "description": "Seborrheic keratoses are benign skin growths that appear as waxy, scaly, slightly elevated lesions, often in varying shades of brown, black, or tan.",
        "nextSteps": [
            "Monitor for any changes in appearance",
            "Avoid irritation from friction or harsh skin products",
            "Consult a dermatologist if removal is desired",
            "Consider cryotherapy or other removal methods if recommended"
        ]
    },
    "SkinCancer": {
        "condition": "Skin Cancer",
        "description": "Skin cancer involves the abnormal growth of skin cells, often linked to excessive sun exposure, and requires prompt medical evaluation.",
        "nextSteps": [
            "Practice rigorous sun protection, including sunscreen and protective clothing",
            "Monitor the skin for new or changing lesions",
            "Consult a dermatologist immediately if suspicious changes occur",
            "Follow prescribed treatment plans if a diagnosis is made"
        ]
    },
    "Sun_Sunlight_Damage": {
        "condition": "Sunlight Damage",
        "description": "Sunlight damage refers to the harmful effects of UV exposure on the skin, leading to premature aging and an increased risk of skin cancer.",
        "nextSteps": [
            "Apply a broad-spectrum sunscreen daily",
            "Wear protective clothing and hats when outdoors",
            "Avoid peak sun hours when possible",
            "Consult a dermatologist for advice on skin repair and prevention"
        ]
    },
    "Tinea": {
        "condition": "Tinea (Fungal Infection)",
        "description": "Tinea is a common fungal skin infection, often known as ringworm, that results in red, itchy, and sometimes circular rashes.",
        "nextSteps": [
            "Keep affected areas clean and dry",
            "Apply over-the-counter antifungal creams as directed",
            "Avoid sharing personal items to prevent spread",
            "Consult a healthcare provider if the infection persists"
        ]
    },
    "Unknown_Normal": {
        "condition": "Unknown/Normal Skin Variations",
        "description": "This category encompasses skin variations that are either normal or not classified as a specific condition, typically not requiring treatment.",
        "nextSteps": [
            "Monitor the skin for any unusual changes",
            "Maintain a consistent skincare routine",
            "Consult a dermatologist if any concerns arise",
            "Document changes for future reference if needed"
        ]
    },
    "Vascular_Tumors": {
        "condition": "Vascular Tumors",
        "description": "Vascular tumors are abnormal growths of blood vessels within the skin, usually benign but sometimes requiring treatment if symptomatic.",
        "nextSteps": [
            "Monitor the lesion for changes in size or appearance",
            "Protect the area from sun exposure",
            "Consult a dermatologist for evaluation",
            "Discuss treatment options if the tumor causes discomfort or cosmetic concern"
        ]
    },
    "Vasculitis": {
        "condition": "Vasculitis",
        "description": "Vasculitis is the inflammation of blood vessels that can affect the skin, leading to red or purple spots and, in some cases, ulceration.",
        "nextSteps": [
            "Seek a prompt medical evaluation for a proper diagnosis",
            "Follow prescribed anti-inflammatory or immunosuppressive treatments",
            "Maintain a healthy lifestyle to support vascular health",
            "Consult a specialist if symptoms persist or worsen"
        ]
    },
    "Vitiligo": {
        "condition": "Vitiligo",
        "description": "Vitiligo is a condition in which the skin loses its pigment cells, resulting in irregular white patches on various parts of the body.",
        "nextSteps": [
            "Protect depigmented areas with sunscreen to prevent sunburn",
            "Consult a dermatologist for treatment options",
            "Explore therapies such as light therapy or topical treatments",
            "Maintain a balanced diet to support overall skin health"
        ]
    },
    "Warts": {
        "condition": "Warts",
        "description": "Warts are small, benign growths on the skin caused by a viral infection, often presenting as rough, raised bumps.",
        "nextSteps": [
            "Keep the affected area clean and dry",
            "Use over-the-counter wart removal treatments",
            "Avoid picking or scratching to prevent spread or infection",
            "Consult a dermatologist if warts persist or multiply"
        ]
    }
}

# Add a simple HTML page for the root route
@app.route('/')
def home():
    # Get list of uploaded files
    files = os.listdir(UPLOAD_FOLDER) if os.path.exists(UPLOAD_FOLDER) else []
    
    html = '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Flask Upload Server</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; }
            h1 { color: #333; }
            .status { padding: 20px; background: #f0f0f0; border-radius: 5px; }
            .files { margin-top: 20px; }
            .file-item { padding: 10px; border-bottom: 1px solid #eee; }
        </style>
    </head>
    <body>
        <h1>Flask Upload Server Status</h1>
        <div class="status">
            <p>✅ Server is running</p>
            <p>📁 Upload endpoint: <code>http://localhost:5000/upload</code></p>
        </div>
        <div class="files">
            <h2>Uploaded Files:</h2>
            {% if files %}
                {% for file in files %}
                    <div class="file-item">📄 {{ file }}</div>
                {% endfor %}
            {% else %}
                <p>No files uploaded yet.</p>
            {% endif %}
        </div>
    </body>
    </html>
    '''
    return render_template_string(html, files=files)

def match_label_to_category(label, categories):
    """
    Matches a given label to its category from the JSON dictionary.
    
    Parameters:
        label (str): The input label (e.g., 'Acne', 'DrugEruption').
        categories (dict): A dictionary where keys are in snake_case and values
                           are objects with 'condition', 'description', and 'nextSteps'.
    
    Returns:
        dict or None: The matching category object, or None if no match is found.
    """
    if label in categories:
        return categories[label]
    # If no match is found, return None
    return None

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filename = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filename)
        response_data = None
        try:
            response_name, response_confidence = give_response(filename)
            data = match_label_to_category(response_name, CONDITION_RESPONSES)
            response_data = {
                "condition": data['condition'],
                "confidence": response_confidence,
                "description": data['description'],
                "nextSteps": data['nextSteps']
            }
        except Exception as e:
            print(e)
            response_data = {
                "condition": "Unknown",
                "confidence": 0.0,
                "description": "Unable to identify the condition.",
                "nextSteps": ["Please consult a healthcare professional for proper diagnosis"]
                }

        # Remove the file after processing
        os.remove(filename)
        
        return jsonify({
            'message': 'Analysis complete',
            'result': response_data
        })

if __name__ == '__main__':
    app.run(debug=True)
