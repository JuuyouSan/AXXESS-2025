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
    "eczema.jpg": {
        "condition": "Eczema",
        "confidence": 0.85,
        "description": "Eczema is a condition where patches of skin become inflamed, itchy, red, cracked, and rough.",
        "nextSteps": [
            "Keep the affected area moisturized",
            "Avoid known triggers (e.g., certain soaps, detergents, or foods)",
            "Consider using over-the-counter hydrocortisone cream",
            "Consult with a dermatologist for personalized treatment"
        ]
    },
    "acne.jpg": {
        "condition": "Acne",
        "confidence": 0.92,
        "description": "Acne is a skin condition that occurs when hair follicles become plugged with oil and dead skin cells.",
        "nextSteps": [
            "Wash affected areas with a gentle cleanser",
            "Use over-the-counter acne products containing benzoyl peroxide or salicylic acid",
            "Avoid touching or picking at acne spots",
            "Consider consulting a dermatologist for severe cases"
        ]
    },
    "psoriasis.png": {
        "condition": "Psoriasis",
        "confidence": 0.88,
        "description": "Psoriasis is a condition that causes skin cells to build up and form scales and itchy, dry patches.",
        "nextSteps": [
            "Keep skin moisturized and hydrated",
            "Use prescribed topical treatments as directed",
            "Consider phototherapy treatment",
            "Follow up with a dermatologist for ongoing management"
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
        
        # Get the response based on the filename
        # response_data = CONDITION_RESPONSES.get(file.filename, {
        #     "condition": "Unknown",
        #     "confidence": 0.0,
        #     "description": "Unable to identify the condition.",
        #     "nextSteps": ["Please consult a healthcare professional for proper diagnosis"]
        # })
        
        response_data = give_response(filename)

        # Remove the file after processing
        os.remove(filename)
        
        return jsonify({
            'message': 'Analysis complete',
            'result': response_data
        })

if __name__ == '__main__':
    app.run(debug=True)
