var PlayerSkill = [];
var PlayerSkillName = 0;
var PlayerSkillLevel = 1;

// Add a new skill or raise the skill level if the skill is already known
function PlayerAddSkill(SkillToAdd, LevelToAdd) {

	// If the skill is already known, we raise the level
	for (var I = 0; I < PlayerSkill.length; I++)
		if (SkillToAdd == PlayerSkill[I][PlayerSkillName]) {
			PlayerSkill[I][PlayerSkillLevel] = PlayerSkill[I][PlayerSkillLevel] + LevelToAdd;
			return;
		}
		
	// If the skill isn't known, we add it to the player skill list
	PlayerSkill[PlayerSkill.length] = [SkillToAdd, LevelToAdd];
	
}

// Returns the current level of a specific skill (0 if the skill isn't known)
function PlayerGetSkillLevel(SkillToQuery) {
	for (var I = 0; I < PlayerSkill.length; I++)
		if (SkillToQuery == PlayerSkill[I][PlayerSkillName])
			return PlayerSkill[I][PlayerSkillLevel];
	return 0;
}