from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import os

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
    print("Request method:", request.method)
    print("Request files:", list(request.files.keys()))
    print("Request form:", list(request.form.keys()))
    
    if 'image' not in request.files:
        print("'image' not found in request.files")
        return jsonify({'error': 'No image part'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filename = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filename)
        return jsonify({
            'message': 'File uploaded successfully',
            'filename': file.filename
        })

if __name__ == '__main__':
    app.run(debug=True)
