// Race parameters
var QuizTimer = 0;
var QuizEnded = false;
var QuizVictory = false;
var QuizEndFunction = "";
var QuizPerfect = true;
var QuizActorLeft = "";
var QuizActorRight = "";
var QuizActorLeader = "";
var QuizImageActorLeft = "";
var QuizImageActorRight = "";
var QuizImageActorLeader = "";
var QuizBackupChapter = "";
var QuizBackupScreen = "";
var QuizDifficultyText = "";
var QuizBackgroundImage = "";
var QuizProgressLeft = -1;
var QuizProgressRight = -1;
var QuizGoal = -1;
var QuizText = null;

// Load the race animations and full sequence
function QuizLoad(ActorLeft, ImageActorLeft, ActorRight, ImageActorRight, ActorLeader, ImageActorLeader, Difficulty, Goal, BackgroundImage, EndFunction) {
	
	// Creates a brand new quiz
	LeaveIcon = "";
	QuizTimer = 0;
	QuizProgressLeft = 0;
	QuizProgressRight = 0;
	QuizGoal = Goal;
	QuizEnded = false;	
	QuizPerfect = true;
	if (QuizText == null) ReadCSV("QuizText", "C999_Common/Quiz/Text_" + CurrentLanguageTag + ".csv");

	// Loads the parameters
	QuizActorLeft = ActorLeft;
	QuizImageActorLeft = ImageActorLeft;
	QuizActorRight = ActorRight;
	QuizImageActorRight = ImageActorRight;
	QuizActorLeader = ActorLeader;
	QuizImageActorLeader = ImageActorLeader;
	QuizDifficultyText = Difficulty;
	QuizEndFunction = EndFunction;
	QuizBackgroundImage = BackgroundImage;
	
	// Keep a backup of the current chapter and screen
	QuizBackupChapter = CurrentChapter;
	QuizBackupScreen = CurrentScreen;
	CurrentChapter = "C999_Common";
	CurrentScreen = "Quiz";

}

// Render the quiz scene
function C999_Common_Quiz_Run() {

	// Paints the background and actors
	DrawImage("C999_Common/Quiz/Backgrounds/" + QuizBackgroundImage + ".jpg", 0, 0);
	DrawImageZoom("C999_Common/Quiz/Actors/" + QuizActorLeft + "/" + QuizImageActorLeft + ".png", 0, 0, 600, 900, 150, 0, 600 * 0.675, 900 * 0.675);
	DrawImageZoomMirror("C999_Common/Quiz/Actors/" + QuizActorRight + "/" + QuizImageActorRight + ".png", 0, 0, 600, 900, 650, 0, 600 * 0.675, 900 * 0.675);

}

// When a click is done while in the quiz
function C999_Common_Quiz_Click() {

}
