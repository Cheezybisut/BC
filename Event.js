var EventLastRandomType = -1;
var EventActivityCurrent = "";
var EventActivityCount = 0;
var EventActivityMaxCount = 0;

// Apply a submissive event on the player
function EventPlayerSubmissive(EventType) {
	OverridenIntroText = "";
	LeaveIcon = "";
	return EventType;
}

// Draws a submissive event for the player at random (Launch from a Mistress Actor)
function EventRandomPlayerSubmissive() {

	// Until we find a proper event
	var Result = 0;
	while (Result == 0) {
	
		// Draw an event type at random, make sure it doesn't repeat
		var EventType = EventLastRandomType;
		while (EventType == EventLastRandomType)
			EventType = Math.floor(Math.random() * 12);

		// Most event have requirements to work
		if ((EventType == 0) && !Common_PlayerRestrained && !Common_PlayerNaked) Result = EventPlayerSubmissive(3000); // Naked
		if ((EventType == 1) && !Common_PlayerRestrained && !Common_PlayerUnderwear && !Common_PlayerChaste) Result = EventPlayerSubmissive(3010); // Underwear {
		if ((EventType == 2) && !Common_PlayerRestrained && (!Common_PlayerClothed || (Common_PlayerCostume != ""))) Result = EventPlayerSubmissive(3020); // School uniform
		if ((EventType == 3) && !Common_PlayerRestrained && (Common_PlayerCostume != "RedBikini") && !Common_PlayerChaste) Result = EventPlayerSubmissive(3030); // Red Bikini
		if ((EventType == 4) && !Common_PlayerRestrained && !Common_PlayerGagged) Result = EventPlayerSubmissive(3100); // Full bondage
		if ((EventType == 5) && !Common_PlayerRestrained) Result = EventPlayerSubmissive(3110); // Restrain bondage
		if ((EventType == 6) && !Common_PlayerGagged) Result = EventPlayerSubmissive(3120); // Gag bondage
		if ((EventType == 7) && Common_PlayerRestrained) { Result = EventPlayerSubmissive(3130); PlayerReleaseBondage(); } // Release from bondage
		if ((EventType == 8) && PlayerHasInventory("CuffsKey")) Result = EventPlayerSubmissive(3140); // Confiscate cuff keys
		if (EventType == 9) Result = EventPlayerSubmissive(3200); // Tickle
		if (EventType == 10) Result = EventPlayerSubmissive(3210); // Spank
		if ((EventType == 11) && !Common_PlayerChaste) Result = EventPlayerSubmissive(3220); // Masturbate

	}

	// Returns the event type which will become the dialog number
	EventLastRandomType = EventType;
	return Result;
	
}

// Log the end of an event, if it's the first time, it can change the actor attitude
function EventLogEnd() {
	if (!GameLogQuery(CurrentChapter, CurrentActor, "Activity" + EventActivityCurrent)) {
		if (EventActivityLove > 0) ActorChangeAttitude(1, 0);
		if (EventActivityLove < 0) ActorChangeAttitude(-1, 0);
		GameLogAdd("Activity" + EventActivityCurrent);
	}
	EventActivityCurrent = "";
}

		
// When an activity event is registered
function EventDoActivity(EventActivityType, EventLoveFactor, EventCurrentStage, EventEndStage, EventBonusStage) {
	
	// If it's a new activity
	if (EventActivityCurrent != EventActivityType) {
		
		// Reset the count and sets the pose
		ActorSetPose(EventActivityType);
		EventActivityCurrent = EventActivityType;
		EventActivityCount = 0;
		EventActivityLove = 0;
		
		// The number of times the activity will be done depends on the love or hate
		if ((EventActivityType == "Tickle") || (EventActivityType == "Masturbate")) EventActivityMaxCount = 5 + Math.floor(ActorGetValue(ActorLove) / 10);
		else EventActivityMaxCount = 5 - Math.floor(ActorGetValue(ActorLove) / 10);
		if (EventActivityMaxCount < 3) EventActivityMaxCount = 3;
		if (EventActivityMaxCount > 8) EventActivityMaxCount = 8;
		
	}
	
	// Increments the activity
	EventActivityCount++;
	EventActivityLove = EventActivityLove + EventLoveFactor;
	
	// If a bonus event can be achieved
	if ((EventActivityCount >= 3) && (EventBonusStage > 0)) {
		
		// 20% bonus chance (+20% if masturbated with an egg)
		var BonusChance = Math.floor(Math.random() * 100);
		if ((EventActivityType == "Masturbate") && PlayerHasLockedInventory("VibratingEgg")) BonusChance = BonusChance + 20;
		
		// If we have the bonus, we log and jump to that stage
		if (BonusChance >= 80) {
			EventLogEnd();
			OverridenIntroText = "";
			return EventBonusStage;
		}

	}
	
	// When the activity is over
	if (EventActivityCount >= EventActivityMaxCount) {
		
		// Log the activity and ends it
		EventLogEnd()
		if (EventActivityLove > 0) OverridenIntroText = GetText("ActivityEndGood");
		if (EventActivityLove = 0) OverridenIntroText = GetText("ActivityEndFair");
		if (EventActivityLove < 0) OverridenIntroText = GetText("ActivityEndBad");
		ActorSetPose("");
		return EventEndStage;
		
	}
	
	// FALSE means the activity isn't over
	return EventCurrentStage;
	
}