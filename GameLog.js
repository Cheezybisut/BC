var GameLog = [];
var GameLogChapter = 0;
var GameLogActor = 1;
var GameLogEvent = 2;

// Log a specific event that happened in the game to be consulted by other scripts afterward
function GameLogSpecificAdd(ChapterToLog, ActorToLog, EventToLog) {

	// If no actor is specified, we imply the player
	if (ActorToLog == "") ActorToLog = "Player";

	// Do not log the same event twice
	for (var L = 0; L < GameLog.length; L++)
		if ((ChapterToLog == GameLog[L][GameLogChapter]) && (ActorToLog == GameLog[L][GameLogActor]) && (EventToLog == GameLog[L][GameLogEvent]))
			return;
		
	// Log the event
	GameLog[GameLog.length] = [ChapterToLog, ActorToLog, EventToLog];

}

// Log a specific event for the current chapter and actor, to be consulted by other scripts afterward
function GameLogAdd(EventToLog) {
	GameLogSpecificAdd(CurrentChapter, CurrentActor, EventToLog);
} 

// Returns TRUE if the event happened based on the query parameters, none of them are mandatory
function GameLogQuery(ChapterToQuery, ActorToQuery, EventToQuery) {

	// Scan the log based on the query parameters, returns TRUE if all parameters are a match
	for (var L = 0; L < GameLog.length; L++)
		if ((ChapterToQuery == "") || (ChapterToQuery == GameLog[L][GameLogChapter])) 
			if ((ActorToQuery == "") || (ActorToQuery == GameLog[L][GameLogActor]))
				if ((EventToQuery == "") || (EventToQuery == GameLog[L][GameLogEvent]))
					return true;

	// Since the queried event wasn't found, we return FALSE
	return false;

}