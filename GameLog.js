var GameLog = [];
var GameLogChapter = 0;
var GameLogActor = 1;
var GameLogEvent = 2;

// Logs a specific event that happened in the game to be consulted by other scripts afterward
function GameLogAdd(ChapterToLog, ActorToLog, EventToLog) {

	// Do not log the same event twice
	for (var L = 0; L < GameLog.length; L++)
		if ((ChapterToLog == GameLog[L][GameLogChapter]) && (ActorToLog == GameLog[L][GameLogActor]) && (EventToLog == GameLog[L][GameLogEvent]))
			return;
		
	// Log the event
	GameLog[GameLog.length] = [ChapterToLog, ActorToLog, EventToLog];

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