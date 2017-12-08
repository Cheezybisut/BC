var C010_Revenge_AmandaSarah_CurrentStage = 0;
var C010_Revenge_AmandaSarah_AmandaVictim = true;
var C010_Revenge_AmandaSarah_AmandaGone = false;
var C010_Revenge_AmandaSarah_SarahGone = false;
var C010_Revenge_AmandaSarah_IntroText = "";

// Chapter 10 - Amanda and Sarah Revenge Load
function C010_Revenge_AmandaSarah_Load() {

	// Set the timer limits at 15:15
	StartTimer(15.25 * 60 * 60 * 1000, "C010_Revenge", "Outro");
	
	// Load the scene parameters (loads Sarah first in case we are starting directly in chapter 10)
	ActorLoad("Sarah", "");
	ActorLoad("Amanda", "");
	ActorSpecificSetPose("Amanda", "Furious");
	ActorSpecificSetPose("Sarah", "Angry");
	LoadInteractions();
	LeaveIcon = "";
	Common_SelfBondageAllowed = false;
	C010_Revenge_AmandaSarah_AmandaVictim = (Common_PlayerCrime == "AmandaStranded");

	// If we must put the previous text back
	if (C010_Revenge_AmandaSarah_IntroText != "") OverridenIntroText = C010_Revenge_AmandaSarah_IntroText;

}

// Chapter 10 - Amanda and Sarah Revenge Run
function C010_Revenge_AmandaSarah_Run() {
	
	// Build the text interactions
	BuildInteraction(C010_Revenge_AmandaSarah_CurrentStage);

	// Before 100 we don't show the player and the girls can leave
	if (C010_Revenge_AmandaSarah_CurrentStage < 100) {
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
				if ((C010_Revenge_AmandaSarah_CurrentStage == 55) || (C010_Revenge_AmandaSarah_CurrentStage == 75))
					DrawActor(CurrentActor, 690, 20, 0.75);
				else
					DrawInteractionActor();			
			}
		}		
	}
	
	// Between 100 and 160, draw the player in the middle of the girls
	if ((C010_Revenge_AmandaSarah_CurrentStage >= 100) && (C010_Revenge_AmandaSarah_CurrentStage <= 160)) {
		DrawActor("Amanda", 525, 50, 0.8);
		DrawActor("Sarah", 800, 50, 0.8);
		DrawActor("Player", 600, 0, 1.0);
	}

	// Between 170 and 180, draw the player in front of the locker, at 190 or 200 she's inside
	if ((C010_Revenge_AmandaSarah_CurrentStage >= 170) && (C010_Revenge_AmandaSarah_CurrentStage <= 180)) DrawActor("Player", 600, 150, 1.0);
	if ((C010_Revenge_AmandaSarah_CurrentStage >= 190) && (C010_Revenge_AmandaSarah_CurrentStage <= 200)) DrawActor("Player", 690, 20, 0.75);

}

// Chapter 10 - Amanda and Sarah Revenge Click
function C010_Revenge_AmandaSarah_Click() {	

	// Regular interactions
	ClickInteraction(C010_Revenge_AmandaSarah_CurrentStage);
	
	// The player can click on herself
	var ClickInv = GetClickedInventory();
	if (ClickInv == "Player") {
		C010_Revenge_AmandaSarah_IntroText = OverridenIntroText;
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}
	
}

// Chapter 10 - Amanda and Sarah Revenge - Switch the focus to another actor
function C010_Revenge_AmandaSarah_SwitchFocus(ActorToFocus) {	
	ActorSetPose("Angry");
	ActorLoad(ActorToFocus, "");
	ActorSetPose("Furious");
	LeaveIcon = "";
}

// Chapter 10 - Amanda and Sarah Revenge - Amanda kneels
function C010_Revenge_AmandaSarah_AmandaKneel() {
	ActorSpecificSetPose("Amanda", "Kneeling");
	ActorSpecificSetPose("Sarah", "Furious");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - Sarah kneels
function C010_Revenge_AmandaSarah_SarahKneel() {
	ActorSpecificSetPose("Sarah", "Kneeling");
	ActorSpecificSetPose("Amanda", "Furious");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - Amanda leaves
function C010_Revenge_AmandaSarah_AmandaLeave() {
	C010_Revenge_AmandaSarah_AmandaGone = true;
	if (!C010_Revenge_AmandaSarah_SarahGone) C010_Revenge_AmandaSarah_SwitchFocus("Sarah");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - Sarah leaves
function C010_Revenge_AmandaSarah_SarahLeave() {
	C010_Revenge_AmandaSarah_SarahGone = true;
	if (!C010_Revenge_AmandaSarah_AmandaGone) C010_Revenge_AmandaSarah_SwitchFocus("Amanda");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - Actor calms down (stops the pose)
function C010_Revenge_AmandaSarah_CalmDown(ActorToCalm) {
	ActorSpecificSetPose(ActorToCalm, "");
}

// Chapter 10 - Amanda and Sarah Revenge - When the actor enters the locker
function C010_Revenge_AmandaSarah_EnterLocker(ActorInLocker) {
	ActorSpecificSetPose(ActorInLocker, "Locker");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - When the player opens the locker
function C010_Revenge_AmandaSarah_OpenLocker(ActorInLocker) {
	if (ActorInLocker == "Amanda") C010_Revenge_AmandaSarah_AmandaGone = false;
	if (ActorInLocker == "Sarah") C010_Revenge_AmandaSarah_SarahGone = false;
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - When the player closer the locker
function C010_Revenge_AmandaSarah_CloseLocker(ActorInLocker) {
	if (ActorInLocker == "Amanda") C010_Revenge_AmandaSarah_AmandaGone = true;
	if (ActorInLocker == "Sarah") C010_Revenge_AmandaSarah_SarahGone = true;
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - Steal Items
function C010_Revenge_AmandaSarah_StealItems() {
	
	// Backup the player inventory
	PlayerSaveAllInventory();
	PlayerRemoveAllInventory();
	CurrentTime = CurrentTime + 50000;
	
	// If Sarah and Amanda are not in belt, and they like (+20 total) or submit (+20 total) to the player, we skip the stripping part
	if (!ActorSpecificHasInventory("Amanda", "ChastityBelt") && !ActorSpecificHasInventory("Sarah", "ChastityBelt") && ((ActorSpecificGetValue("Amanda", ActorLove) + ActorSpecificGetValue("Sarah", ActorLove) >= 20) || (ActorSpecificGetValue("Amanda", ActorSubmission) + ActorSpecificGetValue("Sarah", ActorSubmission) >= 20))) {
		C010_Revenge_AmandaSarah_CurrentStage = 160;
		C010_Revenge_AmandaSarah_SwitchFocus("Sarah");
		Common_PlayerPose = "BackShy";
		OverridenIntroText = GetText("LockerNoStrip");
	}
	
}

// Chapter 10 - Amanda and Sarah Revenge - Starts the fight 2 VS 1
function C010_Revenge_AmandaSarah_StartFight() {
	ActorSpecificChangeAttitude("Amanda", -2, 1);
	ActorSpecificChangeAttitude("Sarah", -2, 1);
}

// Chapter 10 - Amanda and Sarah Revenge - When the player strips
function C010_Revenge_AmandaSarah_PlayerStrip() {
	PlayerClothes("Naked");
	Common_PlayerPose = "BackShy";
	C010_Revenge_AmandaSarah_SwitchFocus("Sarah");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - Tests if they want the player in a chastity belt or not
function C010_Revenge_AmandaSarah_TestForBelt() {

	// If they don't like the player, the play is sub or the player locked a belt on them, she gets a chastity belt
	if (ActorSpecificHasInventory("Amanda", "ChastityBelt")) { C010_Revenge_AmandaSarah_CurrentStage = 130; OverridenIntroText = GetText("BeltForAmandaBelt"); return; }
	if (ActorSpecificHasInventory("Sarah", "ChastityBelt")) { C010_Revenge_AmandaSarah_CurrentStage = 130; OverridenIntroText = GetText("BeltForSarahBelt"); return; }
	if (ActorSpecificGetValue("Amanda", ActorLove) + ActorSpecificGetValue("Sarah", ActorLove) < 0) { C010_Revenge_AmandaSarah_CurrentStage = 130; OverridenIntroText = GetText("BeltForHate"); return; } 
	if (ActorSpecificGetValue("Amanda", ActorSubmission) + ActorSpecificGetValue("Sarah", ActorSubmission) < 0) { C010_Revenge_AmandaSarah_CurrentStage = 130; OverridenIntroText = GetText("BeltForSub"); return; }

}

// Chapter 10 - Amanda and Sarah Revenge - When the player gets locked in a chastity belt
function C010_Revenge_AmandaSarah_LockBelt() {
	PlayerLockInventory("ChastityBelt");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - If Sarah needs to do a special comment on chastity belts
function C010_Revenge_AmandaSarah_BeltComment() {
	if (ActorSpecificHasInventory("Sarah", "ChastityBelt")) OverridenIntroText = GetText("BeltSarah");
	if (ActorSpecificHasInventory("Amanada", "ChastityBelt")) OverridenIntroText = GetText("BeltAmanda");
}

// Chapter 10 - Amanda and Sarah Revenge - Wait in the locker
function C010_Revenge_AmandaSarah_WaitLocker() {
	Common_PlayerPose = "Locker";
}

// Chapter 10 - Amanda and Sarah Revenge - When the player masturbates from inside the locker
function C010_Revenge_AmandaSarah_MasturbateLocker() {
	if (Common_PlayerChaste) OverridenIntroText = GetText("CannotMasturbate");
	else Common_PlayerPose = "LockerMasturbate";
}

// Chapter 10 - Amanda and Sarah Revenge - End the revenge and flag the end
function C010_Revenge_AmandaSarah_EarlyEnding(EndingType) {
	C010_Revenge_EarlyEnding_Type = EndingType;
	SetScene(CurrentChapter, "EarlyEnding");
}