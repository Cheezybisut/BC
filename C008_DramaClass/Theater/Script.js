/*
Full play by stages:
100 - Heroine: Felon!  Thou had ravished my fiancee.
110 - Villain: Her heart had beaten thy true loveth.
120 - Heroine: Foul tongue, liberate with haste.
130 - Villain: Step furth'r and steel awaits thee.
140 - Damsel: Halt!  Before soil turns crimson. * From here, the Damsel can be kidnapped by the black knight
150 - Damsel: Alloweth thy heart speaks pure voice.
160 - Damsel: I profess love unto thy white hero. (200) / I profess love unto thy black champion. (210)  * Now the Damsel can go either side, Sarah will choose the player if +10 love
200 - Villain: Hero!  Thou hast her heart, flesh is mine.
210 - Villain: Hero!  Concede thine defeat, she's mine.
220 - Heroine: So fate chooseth steel, en garde! * From here, the villain or hero can try to restrain each other 
230 - Villain: Indeed, en garde! * Here there's a sword fight (240 if the Heroine wins, 270 if the Villain wins)
240 - Heroine: The law shalt judgeth. * Villain gets tied up
250 - The damsel can be kissed for the final act.
270 - Villain: Thou art mine prisoner. * Heroine gets tied up
280 - The damsel can be kissed or restrained for the final act.
300 - Julia climbs on the stage and applauds.  She can be convinced to do some impro 300+.
*/

var C008_DramaClass_Theater_GlobalStage = 0;
var C008_DramaClass_Theater_PerfectPlay = true;
var C008_DramaClass_Theater_Damsel = "";
var C008_DramaClass_Theater_Heroine = "";
var C008_DramaClass_Theater_Villain = "";

// Chapter 8 - Theater Load, sets the role each images
function C008_DramaClass_Theater_Load() {
	LeaveIcon = "Wait";
	if (C008_DramaClass_JuliaIntro_PlayerRole == "Damsel") C008_DramaClass_Theater_Damsel = "Player";
	if (C008_DramaClass_JuliaIntro_SarahRole == "Damsel") C008_DramaClass_Theater_Damsel = "Sarah";
	if (C008_DramaClass_JuliaIntro_PlayerRole == "Villain") C008_DramaClass_Theater_Villain = "Player";
	if (C008_DramaClass_JuliaIntro_AmandaRole == "Villain") C008_DramaClass_Theater_Villain = "Amanda";
	if (C008_DramaClass_JuliaIntro_PlayerRole == "Heroine") C008_DramaClass_Theater_Heroine = "Player";
	if (C008_DramaClass_JuliaIntro_SarahRole == "Heroine") C008_DramaClass_Theater_Heroine = "Sarah";
	if (C008_DramaClass_JuliaIntro_AmandaRole == "Heroine") C008_DramaClass_Theater_Heroine = "Amanda";
	Common_SelfBondageAllowed = (C008_DramaClass_Theater_GlobalStage >= 300);
}

// Chapter 8 - Theater Run
function C008_DramaClass_Theater_Run() {

	// Draw the background image 
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);

	// Draw the 3 actresses and Julia
	DrawActor(C008_DramaClass_Theater_Damsel, 50, 60, 0.55);
	DrawActor(C008_DramaClass_Theater_Villain, 300, 60, 0.55);
	DrawActor(C008_DramaClass_Theater_Heroine, 850, 60, 0.55);
	if (C008_DramaClass_Theater_GlobalStage < 300) DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Julia.png", 550, 250);
	else DrawActor("Julia", 550, 60, 0.55);

}

// Chapter 8 - Theater Click
function C008_DramaClass_Theater_Click() {

	// When the user clicks on any character
	if ((MouseX >= 50) && (MouseX <= 299) && (MouseY >= 60) && (MouseY <= 540)) SetScene(CurrentChapter, "Damsel");
	if ((MouseX >= 300) && (MouseX <= 549) && (MouseY >= 60) && (MouseY <= 540)) SetScene(CurrentChapter, "Villain");
	if ((MouseX >= 850) && (MouseX <= 1099) && (MouseY >= 60) && (MouseY <= 540)) SetScene(CurrentChapter, "Heroine");
	if ((MouseX >= 550) && (MouseX <= 849) && (MouseY >= 250) && (MouseY <= 600) && (C008_DramaClass_Theater_GlobalStage < 300)) SetScene(CurrentChapter, "Julia");
	if ((MouseX >= 550) && (MouseX <= 849) && (MouseY >= 60) && (MouseY <= 540) && (C008_DramaClass_Theater_GlobalStage >= 300)) SetScene(CurrentChapter, "Julia");

	// Checks if the user clicks on any regular item
	InventoryClick(GetClickedInventory(), "C008_DramaClass", "Theater");

}