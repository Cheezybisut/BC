var C010_Revenge_AmandaSarah_CurrentStage = 0;
var C010_Revenge_AmandaSarah_AmandaVictim = true;
var C010_Revenge_AmandaSarah_AmandaGone = false;
var C010_Revenge_AmandaSarah_SarahGone = false;

// Chapter 10 - Amanda and Sarah Revenge Load
function C010_Revenge_AmandaSarah_Load() {

	// Set the timer limits at 15:15
	StartTimer(15.25 * 60 * 60 * 1000, "C010_Revenge", "Outro");
	ActorSpecificSetPose("Amanda", "Furious");
	ActorSpecificSetPose("Sarah", "Angry");
	
	// Load the scene parameters
	ActorLoad("Amanda", "");
	LoadInteractions();
	LeaveIcon = "";
	C010_Revenge_AmandaSarah_AmandaVictim = (Common_PlayerCrime == "AmandaStranded");

}

// Chapter 10 - Amanda and Sarah Revenge Run
function C010_Revenge_AmandaSarah_Run() {
	BuildInteraction(C010_Revenge_AmandaSarah_CurrentStage);
	if (!C010_Revenge_AmandaSarah_AmandaGone && !C010_Revenge_AmandaSarah_SarahGone) {
		if (CurrentActor == "Amanda") {
			DrawActor("Sarah", 800, 50, 0.8);
			DrawActor("Amanda", 500, 0, 1.0);
		} else {
			DrawActor("Amanda", 525, 50, 0.8);
			DrawActor("Sarah", 675, 0, 1.0);		
		}
	} else {
		if (!C010_Revenge_AmandaSarah_AmandaGone || !C010_Revenge_AmandaSarah_SarahGone) {
			if (C010_Revenge_AmandaSarah_CurrentStage == 55)
				DrawActor(CurrentActor, 690, 20, 0.75);
			else
				DrawInteractionActor();			
		}
	}
}

// Chapter 10 - Amanda and Sarah Revenge Click
function C010_Revenge_AmandaSarah_Click() {	
	ClickInteraction(C010_Revenge_AmandaSarah_CurrentStage);
}

// Chapter 10 - Amanda and Sarah Revenge - Switch the focus to another actor
function C010_Revenge_AmandaSarah_SwitchFocus(ActorToFocus) {	
	ActorSetPose("Angry");
	ActorLoad(ActorToFocus, "");
	ActorSetPose("Furious");
	LeaveIcon = "";
}

// Chapter 10 - Amanda and Sarah Revenge - Sarah Kneels
function C010_Revenge_AmandaSarah_SarahKneel() {
	ActorSpecificSetPose("Sarah", "Kneeling");
	ActorSpecificSetPose("Amanda", "Furious");
}

// Chapter 10 - Amanda and Sarah Revenge - Sarah Leaves
function C010_Revenge_AmandaSarah_SarahLeave() {
	C010_Revenge_AmandaSarah_SarahGone = true;
	if (!C010_Revenge_AmandaSarah_AmandaGone) C010_Revenge_AmandaSarah_SwitchFocus("Amanda");
}

// Chapter 10 - Amanda and Sarah Revenge - Steal Items
function C010_Revenge_AmandaSarah_StealItems() {
	PlayerSaveAllInventory();
	PlayerRemoveAllInventory();
}

// Chapter 10 - Amanda and Sarah Revenge - Amanda Calm Down
function C010_Revenge_AmandaSarah_AmandaCalmDown() {
	ActorSpecificSetPose("Amanda", "");
}

// Chapter 10 - Amanda and Sarah Revenge - Amanda Locker
function C010_Revenge_AmandaSarah_AmandaLocker() {
	ActorSpecificSetPose("Amanda", "Locker");
}

// Chapter 10 - Amanda and Sarah Revenge - Amanda leaves the scene
function C010_Revenge_AmandaSarah_AmandaCloseLocker() {
	C010_Revenge_AmandaSarah_AmandaGone = true;
	if (!C010_Revenge_AmandaSarah_SarahGone) C010_Revenge_AmandaSarah_SwitchFocus("Sarah");
}

// Chapter 10 - Amanda and Sarah Revenge - Amanda enters the scene
function C010_Revenge_AmandaSarah_AmandaOpenLocker() {
	C010_Revenge_AmandaSarah_AmandaGone = false;
}

// Chapter 10 - Amanda and Sarah Revenge - Start the fight
function C010_Revenge_AmandaSarah_StartFight() {
}

// Chapter 10 - Amanda and Sarah Revenge - End the revenge and flag the end
function C010_Revenge_AmandaSarah_EarlyEnding(EndingType) {
	C010_Revenge_EarlyEnding_Type = EndingType;
	SetScene(CurrentChapter, "EarlyEnding");
}
