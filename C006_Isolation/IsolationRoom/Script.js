var C006_Isolation_IsolationRoom_Stage = 0;
var C006_Isolation_IsolationRoom_OrgasmReady = false;
var C006_Isolation_IsolationRoom_StruggleMessageBlink = true;
var C006_Isolation_IsolationRoom_AllowPickLock = false;
var C006_Isolation_IsolationRoom_AllowCutRope = false;

// Remove all cell ground inventory
function C006_Isolation_IsolationRoom_DropInventory() {
	C006_Isolation_CellGround_RopeAvail = true;
	C006_Isolation_CellGround_CollarAvail = true;
	C006_Isolation_CellGround_HookAvail = !C006_Isolation_IsolationRoom_AllowPickLock;
	C006_Isolation_Horse_MetalAvail = (C006_Isolation_Horse_BoltUndone && !C006_Isolation_IsolationRoom_AllowCutRope);
	PlayerRemoveInventory("Rope", 1);
	PlayerRemoveInventory("Collar", 1);
	PlayerRemoveInventory("RustyHook", 1);
	PlayerRemoveInventory("MetalSheet", 1);
}

// Chapter 6 - Isolation Room Load
function C006_Isolation_IsolationRoom_Load() {
	LeaveIcon = "Wait";
	StruggleDone = false;
	StruggleProgress = 0;
	C006_Isolation_IsolationRoom_OrgasmReady = (PlayerHasLockedInventory("VibratingEgg"));
}

// Chapter 6 - Isolation Room Run
function C006_Isolation_IsolationRoom_Run() {
	if (C006_Isolation_IsolationRoom_Stage <= 1) StruggleRun("Click rapidly on a restrain to try to struggle out.", C006_Isolation_IsolationRoom_Stage);
	if (C006_Isolation_IsolationRoom_Stage == 2) StruggleRun("", C006_Isolation_IsolationRoom_Stage);
	if (C006_Isolation_IsolationRoom_Stage == 3) StruggleRun("Find a way to free yourself.", C006_Isolation_IsolationRoom_Stage);
}

// Chapter 6 - Isolation Room Click - The player can try to struggle out of the restrains
function C006_Isolation_IsolationRoom_Click() {

	// On stage 0, only the leg ropes can be removed, the crotch rope also works with an egg
	if ((C006_Isolation_IsolationRoom_Stage == 0) && (!StruggleDone)) {
		StruggleClick("C006_Legs", "Normal", "Struggle to reach and undo the leg knots!", "You did it!  You freed your legs!", 260, 315, 100);
		StruggleClick("C006_Crotch", "Easy", "Stimulate with the crotch rope!", (C006_Isolation_IsolationRoom_OrgasmReady ? "Combined with the egg, the crotch rope gives you a sweet orgasm." : "The rope feels very nice but it's not enough to get an orgasm."), 435, 285, 70);
		StruggleClick("C006_Arms", "Impossible", "Struggle to free your arms!", "", 700, 240, 100);
		StruggleClick("C006_Collar", "Impossible", "Struggle to break the collar!", "", 930, 320, 50);
		StruggleClick("C006_Ballgag", "Impossible", "Struggle to spit the ballgag!", "", 1055, 355, 70);
	}

	// On stage 1, only the collar can be unstrapped, the crotch rope also works with an egg
	if ((C006_Isolation_IsolationRoom_Stage == 1) && (!StruggleDone)) {
		StruggleClick("C006_Crotch", "Easy", "Stimulate with the crotch rope!", (C006_Isolation_IsolationRoom_OrgasmReady ? "Combined with the egg, the crotch rope gives you a sweet orgasm." : "The rope feels very nice but it's not enough to get an orgasm."), 435, 285, 70);
		StruggleClick("C006_Arms", "Impossible", "Struggle to free your arms!", "", 700, 240, 100);
		StruggleClick("C006_Collar", "Hard", "Struggle to unstrap the collar with your foot!", "You did it!  The collar is unstrapped.", 910, 310, 50);
		StruggleClick("C006_Ballgag", "Impossible", "Struggle to spit the ballgag!", "", 1055, 355, 70);
	}

	// On stage 2, no real struggling can be done
	if ((C006_Isolation_IsolationRoom_Stage == 2) && (!StruggleDone)) {
		StruggleClick("C006_Crotch", "Easy", "Stimulate with the crotch rope!", (C006_Isolation_IsolationRoom_OrgasmReady ? "Combined with the egg, the crotch rope gives you a sweet orgasm." : "The rope feels very nice but it's not enough to get an orgasm."), 575, 490, 65);
		StruggleClick("C006_Arms", "Impossible", "Struggle to free your arms!", "", 575, 350, 65);
		StruggleClick("C006_Ballgag", "Impossible", "Struggle to spit the ballgag!", "", 575, 210, 65);
		if ((MouseX >= 1) && (MouseX <= 450) && (MouseY >= 450) && (MouseY <= 599)) SetScene(CurrentChapter, "CellGround");
		if ((MouseX >= 750) && (MouseX <= 1150) && (MouseY >= 1) && (MouseY <= 599) && !C006_Isolation_IsolationRoom_AllowPickLock) SetScene(CurrentChapter, "CellDoor");
		if (C006_Isolation_IsolationRoom_AllowPickLock) StruggleClick("C006_CellDoor", "Normal", "Struggle to pick the lock!", "Well done!  You can leave the cell.", 900, 300, 200);
	}

	// On stage 3, no real struggling can be done
	if ((C006_Isolation_IsolationRoom_Stage == 3) && (!StruggleDone)) {
		StruggleClick("C006_Arms", "Impossible", "Struggle to free your arms!", "", 390, 320, 80);
		if ((MouseX >= 1) && (MouseX <= 300) && (MouseY >= 300) && (MouseY <= 599)) SetScene(CurrentChapter, "CellGround");
		if ((MouseX >= 1035) && (MouseX <= 1200) && (MouseY >= 250) && (MouseY <= 599)) SetScene(CurrentChapter, "Pillory");
		if ((MouseX >= 540) && (MouseX <= 825) && (MouseY >= 290) && (MouseY <= 450)) SetScene(CurrentChapter, "Horse");
		if ((MouseX >= 460) && (MouseX <= 630) && (MouseY >= 30) && (MouseY <= 289)) SetScene(CurrentChapter, "Cross");
		if ((MouseX >= 830) && (MouseX <= 1000) && (MouseY >= 180) && (MouseY <= 300) && (!C006_Isolation_IsolationRoom_AllowCutRope)) SetScene(CurrentChapter, "Table");
		if (C006_Isolation_IsolationRoom_AllowCutRope) StruggleClick("C006_CutRope", "Hard", "Struggle to cut the rope!", "You did it!  You can escape isolation.", 910, 220, 100);
	}
	
	// Opens the inventory screen 
	InventoryClick(GetClickedInventory(), CurrentChapter, "IsolationRoom");

}

// Chapter 6 - Isolation Room Click
function C006_Isolation_IsolationRoom_StruggleDone() {

	// If we must move from one screen stage to another
	if ((C006_Isolation_IsolationRoom_Stage == 0) && (StruggleType == "C006_Legs")) C006_Isolation_IsolationRoom_Stage++;
	if ((C006_Isolation_IsolationRoom_Stage == 1) && (StruggleType == "C006_Collar")) { PlayerUnlockInventory("Collar"); C006_Isolation_IsolationRoom_Stage++; }
	if ((C006_Isolation_IsolationRoom_Stage == 2) && (StruggleType == "C006_CellDoor")) C006_Isolation_IsolationRoom_Stage++;
	if ((C006_Isolation_IsolationRoom_Stage == 3) && (StruggleType == "C006_CutRope")) SetScene(CurrentChapter, "Outro");
	
	// Can only have one orgasm from the crotch rope at any stage
	if (StruggleType == "C006_Crotch") C006_Isolation_IsolationRoom_OrgasmReady = false;
	
}
