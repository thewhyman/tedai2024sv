from flask import Flask, request, send_file, jsonify

import requests
from pose_format import Pose
from pose_format.pose_visualizer import PoseVisualizer

app = Flask(__name__)

@app.route('/run', methods=['POST'])
def translate_text():
    # Get the spoken text from the request body
    text = request.json.get('text', '')

    video = requests.get('https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_pose?text=' + text + '&spoken=en&signed=ase')
    pose = Pose.read(video.content)

    visualizer = PoseVisualizer(pose)
    visualizer.save_video("example.mp4", visualizer.draw())
    return send_file("example.mp4", mimetype='video/mp4')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
