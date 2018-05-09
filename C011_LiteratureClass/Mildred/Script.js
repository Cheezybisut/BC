var C011_LiteratureClass_Mildred_CurrentStage = 0;
var C011_LiteratureClass_Mildred_Angry = false;
var C011_LiteratureClass_Mildred_GoodStudentCount = 0;

// Chapter 11 - Mildred Load
function C011_LiteratureClass_Mildred_Load() {

	// Load the scene parameters
	ActorLoad("Mildred", "");
	LoadInteractions();
	StartTimer(16.5 * 60 * 60 * 1000, "C011_LiteratureClass", "Outro");
	C011_LiteratureClass_Mildred_Angry = GameLogQuery("C006_Isolation", "Mildred", "Isolation");

}

// Chapter 11 - Mildred Run
function C011_LiteratureClass_Mildred_Run() {
	BuildInteraction(C011_LiteratureClass_Mildred_CurrentStage);
}

// Chapter 11 - Mildred Click
function C011_LiteratureClass_Mildred_Click() {

	// Regular interactions
	ClickInteraction(C011_LiteratureClass_Mildred_CurrentStage);
	var ClickedInv = GetClickedInventory();
	
}

// Chapter 11 - Mildred recognizes that player is being a good student
function C011_LiteratureClass_Mildred_GoodStudent() {
	C011_LiteratureClass_Mildred_GoodStudentCount++;
}