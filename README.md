# AXXESS-2025
UTD AXXESS's hackathon for spring 2025

# About the Project

![GitHub Logo](https://github.com/main/frontend/public/logo.png)

## Inspiration  
Initially, we considered an AI-powered healthcare application that analyzed cough sounds to diagnose infections. However, we faced technical challenges with MP4 conversions, making it difficult to process audio effectively within the time constraints.  

As we brainstormed, we thought about a common struggle we all face—skin conditions. With eczema season in full swing and breakouts increasing due to changing weather, we saw an opportunity to leverage AI to provide instant skin disease detection. Rather than waiting for a dermatologist appointment, users could simply upload an image and receive an analysis in seconds. This idea felt both practical and impactful, inspiring us to create **DeepSkin**.  

## What it does  
**DeepSkin** is an AI-powered web application that analyzes uploaded images to detect skin diseases. Users take a picture of their skin condition, upload it to the platform, and within seconds, our machine learning model provides a classification along with confidence levels. We prioritized **accuracy and accessibility**, ensuring that people can get a quick assessment without unnecessary barriers.  

## How we built it  
We trained a **computer vision model** using **PyTorch** on a skin disease dataset sourced from Kaggle. Our approach involved:  
- **Model Development:** We fine-tuned a pre-trained model on skin disease classification, ensuring higher accuracy with limited data.  
- **Data Processing:** Cleaning, augmenting, and splitting the dataset to prevent overfitting.  
- **Hyperparameter Tuning:** Experimenting with different parameters to optimize the validation accuracy.  
- **Web Integration:** A user-friendly frontend where users can upload images, and a backend that processes the image and returns results from the AI model.  
- **Deployment:** Setting up a functional prototype within the 30-hour hackathon window.  

## Challenges we ran into  
Like any hackathon project, we faced several obstacles:  
- **Time Constraints:** Training an AI model within 30 hours meant we had to be strategic about preprocessing and model selection.  
- **Hyperparameter Optimization:** Ensuring the model wasn't overfitting while maintaining a good validation accuracy was a tough balancing act.  
- **Data Limitations:** The dataset had some biases, so we had to preprocess it carefully to get better real-world performance.  

Despite these challenges, we pushed forward and successfully built a working model that exceeded our initial expectations.  

## Accomplishments that we're proud of  
We were amazed at how well our model performed, particularly in detecting **acne with high confidence**. Given the short timeframe, achieving a functional AI-powered skin disease detector was a huge milestone.  

Additionally, we’re proud of how our team collaborated, adapted quickly, and kept pushing through obstacles. This hackathon reinforced the importance of **clear roles, problem-solving under pressure, and maintaining a strong team dynamic**.  

## What we learned  
Beyond technical skills, we learned:  
- The importance of **team roles and collaboration**—dividing tasks efficiently while helping each other when needed.  
- **AI model tuning strategies**—how small adjustments in hyperparameters can drastically impact performance.  
- **The value of breaks and balance**—taking time to reset allowed us to maintain focus and energy throughout the hackathon.  

## What's next for DeepSkin  
We see **DeepSkin** as more than just a hackathon project—it has real potential as a useful AI tool. Here’s what we plan next:  
- **Expanding the dataset** to include more skin conditions for improved classification.  
- **Adding dermatologist recommendations** based on severity, providing users with actionable insights.  
- **Enhancing the UI/UX** for a more seamless and accessible user experience.  
- **Potential product launch**, refining the technology into a fully-fledged healthcare tool that could assist in early skin disease detection worldwide.  

DeepSkin was built in a weekend, but its journey is just beginning! 🚀  

## Contributors 
* Justin Truong (Front End) - (https://github.com/JuuyouSan)
* Reyan Patel (Front End) -  (https://github.com/reyanp)
* Justin Lai (Back End) - (https://github.com/justi-lai)
* Neal Kapadia (Back End) - (https://github.com/NealKapadia)
