from flask import jsonify, request
from database import db
from models import Agent
import ollama
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
OLLAMA_API_URL = os.getenv('OLLAMA_API_URL', 'http://localhost:11434')

def init_routes(app):
    @app.route('/api/agents', methods=['GET'])
    def get_agents():
        agents = Agent.query.all()
        return jsonify([agent.to_dict() for agent in agents])

    @app.route('/api/agents', methods=['POST'])
    def create_agent():
        data = request.get_json()
        task = data.get('task')
        if not task:
            return jsonify({'error': 'Task is required'}), 400
        
        try:
            # Call Ollama API to process the task
            response = ollama.generate(
                model='llama3.2',
                prompt=f"Provide a concise response for the following task: {task}",
                stream=False,
                options={'temperature': 0.7}
            )
            ai_response = response['response'] if 'response' in response else 'No response generated'
        except Exception as e:
            ai_response = f'Error processing task: {str(e)}'

        # Store agent with AI-generated response as status
        agent = Agent(task=task, status=ai_response)
        db.session.add(agent)
        db.session.commit()
        return jsonify(agent.to_dict()), 201

    @app.route('/api/agents/<int:id>', methods=['DELETE'])
    def delete_agent(id):
        agent = Agent.query.get(id)
        if not agent:
            return jsonify({'error': 'Agent not found'}), 404
        
        db.session.delete(agent)
        db.session.commit()
        return jsonify({'message': 'Agent deleted'}), 200