from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo
from bson import ObjectId

app = Flask(__name__)
CORS(app)

#Initialising database
client = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
db = client["NOTES"]
collection = db["NOTES"]

CORS(app, resources={r"/*": {"origins": "*"}})

#Create a note
@app.route('/api/notes', methods=['POST'])
def create_note():
    data = request.json
    title = data["title"]
    content = data["content"]

    note = {"title":title, "content":content}
    insert_note = collection.insert_one(note)

    json_note = jsonify({"id":str(insert_note.inserted_id),
                         "message":"Your note has been created successfully!"})
    return json_note

#Read a note
@app.route('/notes', methods=['GET'])
@app.route('/notes/<note_id>', methods=['GET'])
def read_note(note_id):
    try:
        #Get id from user in order to identify the note in db
        note = collection.find_one({"_id": ObjectId(note_id)})

        if note:

            to_json = {
                "id": str(note["_id"]),
                "title": note["title"],
                "content": note["content"]
            }
            return jsonify(to_json)
        else:

            return jsonify({"message": "Sorry, your note has not been found!"})
    except Exception as e:

        return jsonify({"message": f"Error: {str(e)}"})


#Update a note
@app.route('/notes/<note_id>', methods=['PUT'])
def update_note(note_id):
    data = request.json
    #update_choice = data.get("update_choice")

    try:
        #Get updated title and content from user
        new_title = data.get("new_title")
        collection.update_one({"_id":ObjectId(note_id)},
                              {"$set":{"title":new_title}})

        new_content = data.get("new_content")
        collection.update_one({"_id":ObjectId(note_id)},
                              {"$set":{"content":new_content}})
    except ValueError:
        return jsonify({"message":"Sorry, your note has not been found! Please try again!"})

    updated_note = collection.find_one({"_id":ObjectId(note_id)})

    return jsonify(
        {"id": str(updated_note["_id"]), "title": updated_note["title"], "content": updated_note["content"]})

#Delete a note
@app.route('/notes/<note_id>', methods=['DELETE'])
def delete_note(note_id):
    try:
    #Take note id to indetify it and then delete it
        note = collection.find_one({"_id": ObjectId(note_id)})

        if note:

            collection.delete_one({"_id": ObjectId(note_id)})
            return jsonify({"message": "Your note has been deleted!"})
        else:
            return jsonify({"message": "Sorry, the note was not found!"})
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)





