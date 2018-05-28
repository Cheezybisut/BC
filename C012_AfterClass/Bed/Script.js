var C012_AfterClass_Bed_CurrentStage = 0;

// Chapter 12 After Class - Bed Load
function C012_AfterClass_Bed_Load() {
	LeaveIcon = "Leave";
	LeaveScreen = "Dorm";
	LoadInteractions();
	if (C012_AfterClass_Bed_CurrentStage == 10) C012_AfterClass_Bed_CurrentStage = 0;
}

// Chapter 12 After Class - Bed Run
function C012_AfterClass_Bed_Run() {
	BuildInteraction(C012_AfterClass_Bed_CurrentStage);
}

// Chapter 12 After Class - Bed Click
function C012_AfterClass_Bed_Click() {	

	// Regular interactions
	ClickInteraction(C012_AfterClass_Bed_CurrentStage);

}

// Chapter 12 After Class - Fall asleep and ends the chapter
function C012_AfterClass_Bed_EndChapter() {	
	SetScene(CurrentChapter, "Outro");
}