def update_history(collection, _id, new_vector):
	'''
	collection: The MongoDB collection to be updated.
	id: user ID for which an update is made.
	post: the desired modification

	The modification is inserted into the user document;
	if it does not exist, a new document is NOT created.
	
	'''
	import datetime

	existing_doc = collection.find_one('user_id': _id)
	emotion_history = existing_doc['history']
	time_stamp = datetime.datetime.utcnow() # ordered time stamps
	# or new_element = {time_stamp: new_vector}
	new_element = {'time': str(time_stamp), 'data': new_vector}

	emotion_history.append(new_element)
	collection.update_one({'user_id': _id}, {"$set": {'history': emotion_history}}, upsert=False)

def clean_history(collection, _id, n=100):
	'''
	collection: The MongoDB collection to be updated.
	id: user ID for which an update is made.

	Updates the emotion history and keeps the last n elements.
	'''

	existing_doc = collection.find_one('user_id': _id)
	emotion_history = existing_doc['history']

	if len(emotion_history) < 100:
		raise Exception('The history list is too short to be cleaned yet!')

	# keeps the last n elements
	cleaned_emotion_history = emotion_history[-1:n-1:-1]
	collection.update_one({'user_id': _id}, {"$set": {'history': cleaned_emotion_history}}, upsert=False)

