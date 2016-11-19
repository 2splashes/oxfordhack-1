import requests
import numpy as np
from pymongo import MongoClient
from bson.objectid import ObjectId

#### 

_key = '1521013cecd149fca7543bac79c8784d'
_url = 'https://api.projectoxford.ai/emotion/v1.0/recognize'
user_id = '' # ObjectID # what we will use to query the DB for the user
maxNumRetries = 10
emotion_list = ['anger', 'contempt', 'disgust', 'fear', 'happiness',
				'neutral', 'sadness', 'surprise']

#### API CALL FUNCTION ####

def processRequest( json, data, headers, params ):

    """
    Helper function to process the request to Project Oxford

    Parameters:
    json: Used when processing images from its URL. See API Documentation
    data: Used when processing image read from disk. See API Documentation
    headers: Used to pass the key information and the data type request
    """

    retries = 0
    result = None

    while True:

        response = requests.request( 'post', _url, json = json, 
        	data = data, headers = headers, params = params )

        if response.status_code == 429: 

            print( "Message: %s" % ( response.json()['error']['message'] ) )

            if retries <= _maxNumRetries: 
                time.sleep(1) 
                retries += 1
                continue
            else: 
                print( 'Error: failed after retrying!' )
                break

        elif response.status_code == 200 or response.status_code == 201:

            if 'content-length' in response.headers and int(response.headers['content-length']) == 0: 
                result = None 
            elif 'content-type' in response.headers and isinstance(response.headers['content-type'], str): 
                if 'application/json' in response.headers['content-type'].lower(): 
                    result = response.json() if response.content else None 
                elif 'image' in response.headers['content-type'].lower(): 
                    result = response.content
        else:
            print( "Error code: %d" % ( response.status_code ) )
            print( "Message: %s" % ( response.json()['error']['message'] ) )

        break
        
    return result

#################################################

def most_likely_state(score_dict):
	'''
	returns a tuple of the most likely emotion and its calculated probability
	'''
	sorted_states = sorted(score_dict, key=score_dict.__getitem__, reverse=True)
	most_likely_state = sorted_states[0]

	return (most_likely_state, score_dict['most_likely_state'])

def average_states(history):
	'''
	history: a list of emotion vectors

	Returns averaged probabilities for each emotion over the last 100 photos.
	'''
	global emotion_list


	if len(history) > 100:
		history = history[-1:99:-1]

	emotion_dict = dict()
	averaged_emotions = dict()

	for emotion in emotion_list:
		emotion_dict['emotion'] = list()
		for item in history:
			scores_dict = item['data'][0]
			state_probability = scores_dict[emotion]
			emotion_dict['emotion'].append(state_probability)
		averaged_emotions['emotion'] = np.mean(emotion_dict['emotion'])

	return averaged_emotions



####

# Location of the image / photo
urlImage = ''

headers = dict()
headers['Ocp-Apim-Subscription-Key'] = _key
headers['Content-Type'] = 'application/json' 

json = { 'url': urlImage } 
data = None
params = None

# API call returns a list
# first element is the dictionary we want
result = processRequest( json, data, headers, params )[0]

