var C002_FirstClass_Mildred_CurrentStage = 0;
var C002_FirstClass_Mildred_DisturbCount = 0;
var C002_FirstClass_Mildred_SearchAvail = true;
var C002_FirstClass_Mildred_BeatingDone = false;
var C002_FirstClass_Mildred_WhipDone = false;
var C002_FirstClass_Mildred_ConfirmUnlock = false;

// Chapter 2 - Mildred Load
function C002_FirstClass_Mildred_Load() {

	// Load the scene parameters	
	ActorLoad("Mildred", "Classroom");
	LoadInteractions();
	C002_FirstClass_Mildred_ConfirmUnlock = false;
	if (C002_FirstClass_Mildred_CurrentStage == 0) StartTimer(8.5 * 60 * 60 * 1000, "C002_FirstClass", "SarahIntro");
	
	// When re-entering, jump from 50 to 200 and stop any whipping
	if (C002_FirstClass_Mildred_CurrentStage == 50) C002_FirstClass_Mildred_CurrentStage = 200;
	if ((C002_FirstClass_Mildred_CurrentStage >= 410) && (C002_FirstClass_Mildred_CurrentStage <= 440)) C002_FirstClass_Mildred_CurrentStage = C002_FirstClass_Mildred_CurrentStage - 100;
	
	// When the talk is over, allow the player to leave
	if (C002_FirstClass_Mildred_CurrentStage >= 200) LeaveIcon = "Leave";
	else LeaveIcon = "";
	
}

// Chapter 2 - Mildred Run
function C002_FirstClass_Mildred_Run() {
	BuildInteraction(C002_FirstClass_Mildred_CurrentStage);
}

// Chapter 2 - Mildred Click
function C002_FirstClass_Mildred_Click() {	

	// Regular interactions
	ClickInteraction(C002_FirstClass_Mildred_CurrentStage);
	var ClickedInv = GetClickedInventory();
	
	// Beyond -3 love, the teacher spank the player
	if ((C002_FirstClass_Mildred_CurrentStage <= 50) && (ActorGetValue(ActorLove) <= -3) && !C002_FirstClass_Mildred_BeatingDone) {
		OveridenIntroText = "(Without warning, she jumps on you, forces you|to bend on your desk and raises your skirt.)";
		C002_FirstClass_Mildred_CurrentStage = 100;
		C002_FirstClass_Mildred_BeatingDone = true;
	}	

	// When the user wants to use the gag
	if ((C002_FirstClass_Mildred_CurrentStage >= 310) && (ClickedInv == "Ballgag") && (ActorHasInventory("Ballgag") == false) && (Common_PlayerNotRestrained)) {
		C002_FirstClass_Mildred_CurrentStage = parseInt(C002_FirstClass_Mildred_CurrentStage) + 10;
		OveridenIntroText = "(You push the ball in her mouth and buckle|the straps while she protests incomprehensibly.)"
		PlayerRemoveInventory("Ballgag", 1);
		ActorAddInventory("Ballgag");
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use the key
	if (((C002_FirstClass_Mildred_CurrentStage == 310) || (C002_FirstClass_Mildred_CurrentStage == 320) || (C002_FirstClass_Mildred_CurrentStage == 410) || (C002_FirstClass_Mildred_CurrentStage == 420)) && (ClickedInv == "CuffsKey")) {
		if (C002_FirstClass_Mildred_ConfirmUnlock == false) {
			OveridenIntroText = "(Are you sure you want to unlock her?|Click on the key again to do so.)";
			C002_FirstClass_Mildred_ConfirmUnlock = true;
		} else {
			OveridenIntroText = "(After you unlock her, she pins you and|restrains you.) You saved yourself little miss.";
			CurrentTime = CurrentTime + 60000;
			ActorRemoveInventory("Cuffs");
			ActorRemoveInventory("Ballgag");
			ActorChangeAttitude(2, 0);
			C002_FirstClass_Mildred_RestrainPlayer();
			Common_PlayerCrime = "";
		}
	}

	// When the user wants to use the crop
	if ((C002_FirstClass_Mildred_CurrentStage >= 310) && (C002_FirstClass_Mildred_CurrentStage <= 340) && (ClickedInv == "Crop") && (Common_PlayerNotRestrained) && (Common_PlayerNotGagged)) {
		C002_FirstClass_Mildred_CurrentStage = parseInt(C002_FirstClass_Mildred_CurrentStage) + 100;
		OveridenIntroText = ""
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use the rope
	if (((C002_FirstClass_Mildred_CurrentStage == 310) || (C002_FirstClass_Mildred_CurrentStage == 320) || (C002_FirstClass_Mildred_CurrentStage == 410) || (C002_FirstClass_Mildred_CurrentStage == 420)) && (ClickedInv == "Rope") && (Common_PlayerNotRestrained)) {
		C002_FirstClass_Mildred_CurrentStage = parseInt(C002_FirstClass_Mildred_CurrentStage) + 20;
		OveridenIntroText = "(You circle the rope around her body, making|tight knots.  Once done, you remove her cuffs.)";
		PlayerRemoveInventory("Rope", 1);
		ActorAddInventory("Rope");
		PlayerAddInventory("Cuffs", 1);
		ActorRemoveInventory("Cuffs");
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use the cuffs
	if (((C002_FirstClass_Mildred_CurrentStage == 330) || (C002_FirstClass_Mildred_CurrentStage == 340) || (C002_FirstClass_Mildred_CurrentStage == 430) || (C002_FirstClass_Mildred_CurrentStage == 440)) && (ClickedInv == "Cuffs") && (Common_PlayerNotRestrained)) {
		C002_FirstClass_Mildred_CurrentStage = parseInt(C002_FirstClass_Mildred_CurrentStage) - 20;
		OveridenIntroText = "(You cuff her again and undo all the knots|while she tries to kick you without success.)";
		PlayerAddInventory("Rope", 1);
		ActorRemoveInventory("Rope");
		PlayerRemoveInventory("Cuffs", 1);
		ActorAddInventory("Cuffs");
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the talk is over, allow the player to leave
	if (C002_FirstClass_Mildred_CurrentStage == 50)
		LeaveIcon = "Leave";
	
}

// Chapter 2 - Mildred Restrain Player
function C002_FirstClass_Mildred_RestrainPlayer() {	
	PlayerLockInventory("Cuffs");
	PlayerLockInventory("Ballgag");
	PlayerRemoveAllInventory();
	C002_FirstClass_Classroom_MildredSubdueFailed = true;
	C002_FirstClass_Mildred_CurrentStage = 200;
	OveridenIntroImage = "MildredGagPlayer.jpg";
	LeaveIcon = "Leave";
}

// Chapter 2 - Mildred Disturb Class
function C002_FirstClass_Mildred_Disturb() {
	
	// After 4 attempts to disturb Mildred, she cuffs and gags the player
	C002_FirstClass_Mildred_DisturbCount++;
	if (C002_FirstClass_Mildred_DisturbCount == 1) OveridenIntroText = "(She looks at you briefly.) Young lady,|stay quiet while I teach, we can talk after class.";
	if (C002_FirstClass_Mildred_DisturbCount == 2) OveridenIntroText = "(She looks angry at you.) Little Miss!|You will stop bothering the class right now!";
	if (C002_FirstClass_Mildred_DisturbCount == 3) OveridenIntroText = "(She looks furious.) This is your last warning!|The next time you bother the class I will restrain you.";
	if (C002_FirstClass_Mildred_DisturbCount == 4) {
		OveridenIntroText = "(She pins you down and raises your skirt.)|Young lady, today you will learn a lesson on discipline.";
		C002_FirstClass_Mildred_CurrentStage = 220;
		LeaveIcon = "";
	}

}

// Chapter 2 - Mildred Subdue
function C002_FirstClass_Mildred_Subdue() {
	
	// Count the number of girls who agree
	var AgreeCount = 0;
	if (C002_FirstClass_Classroom_SidneyAgree) AgreeCount++;
	if (C002_FirstClass_Classroom_AmandaAgree) AgreeCount++;
	if (C002_FirstClass_Classroom_SarahAgree) AgreeCount++;

	// With no helper
	if (AgreeCount == 0) {
		OveridenIntroText = "(Alone, you fail to subdue her and she pins you down.)|Young lady, today you will learn a lesson on discipline.";
		C002_FirstClass_Mildred_CurrentStage = 220;
		LeaveIcon = "";		
	}
	
	// With one helper, both the player and the helper end up bound and gagged
	if (AgreeCount == 1) {
		if (C002_FirstClass_Classroom_SidneyAgree) { OveridenIntroText = "(You and Sidney fail to subdue and she pins you.)|Young lady, today you will learn a lesson on discipline."; CurrentActor = "Sidney"; ActorAddInventory("Cuffs"); ActorAddInventory("Ballgag"); }
		if (C002_FirstClass_Classroom_AmandaAgree) { OveridenIntroText = "(You and Amanda fail to subdue and she pins you.)|Young lady, today you will learn a lesson on discipline."; CurrentActor = "Amanda"; ActorAddInventory("Cuffs"); ActorAddInventory("Ballgag"); }
		if (C002_FirstClass_Classroom_SarahAgree) { OveridenIntroText = "(You and Sarah fail to subdue and she pins you.)|Young lady, today you will learn a lesson on discipline."; CurrentActor = "Sarah"; ActorAddInventory("Cuffs"); ActorAddInventory("Ballgag"); }
		CurrentActor = "Mildred";
		C002_FirstClass_Mildred_CurrentStage = 220;
		LeaveIcon = "";
	}

	// With many helpers
	if (AgreeCount >= 2) {
		OveridenIntroText = "(With your helpers, you're able to strip Mildred.|You find some cuffs in her stuff and lock her wrists.)";
		ActorAddInventory("Cuffs");
		C002_FirstClass_Classroom_MildredSubdueSuccess = true;
		C002_FirstClass_Mildred_CurrentStage = 300;
		Common_PlayerCrime = "RestrainMildred";
	}

}

// Chapter 2 - Mildred Search
function C002_FirstClass_Mildred_Search() {
	C002_FirstClass_Mildred_SearchAvail = false;
	PlayerAddInventory("Crop", 1);
	PlayerAddInventory("Cuffs", 1);
	PlayerAddInventory("CuffsKey", 1);
	PlayerAddInventory("Ballgag", 2);
}

// Chapter 2 - Mildred Ungag
function C002_FirstClass_Mildred_Ungag() {
	ActorRemoveInventory("Ballgag");
	PlayerAddInventory("Ballgag", 1);
}

// Chapter 2 - Mildred Whip, it only changes her attitude once
function C002_FirstClass_Mildred_Whip() {
	if (C002_FirstClass_Mildred_WhipDone == false) {
		ActorChangeAttitude(-1, 1);
		C002_FirstClass_Mildred_WhipDone = true;
	}
}