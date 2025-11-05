/**
 * Databáze cviků pro jednotlivé svaly
 * Obsahuje cviky na posílení a mobilitu pro každý sval
 */

export interface MuscleExercise {
  name: string;
  type: 'strength' | 'mobility';
  description?: string;
}

export interface MuscleExercises {
  strength: MuscleExercise[];
  mobility: MuscleExercise[];
}

/**
 * Mapování cviků na svaly podle názvu svalu
 */
export const muscleExercisesMap: Record<string, MuscleExercises> = {
  // Svaly zadní strany stehna
  'Sval pološlachovitý': {
    strength: [
      { name: 'Rumunský mrtvý tah', type: 'strength' },
      { name: 'Zakopávání vleže', type: 'strength' },
      { name: 'Dobré ráno', type: 'strength' },
      { name: 'Hamstring curls', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení hamstringů vsedě', type: 'mobility' },
      { name: 'Protažení hamstringů vestoje', type: 'mobility' },
    ],
  },
  'Sval poloblanitý': {
    strength: [
      { name: 'Rumunský mrtvý tah', type: 'strength' },
      { name: 'Zakopávání vleže', type: 'strength' },
      { name: 'Dobré ráno', type: 'strength' },
      { name: 'Nordic curls', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení hamstringů vsedě', type: 'mobility' },
      { name: 'Hluboký předklon', type: 'mobility' },
    ],
  },
  'Dvojhlavý sval stehenní': {
    strength: [
      { name: 'Rumunský mrtvý tah', type: 'strength' },
      { name: 'Zakopávání vleže', type: 'strength' },
      { name: 'Dobré ráno s činkou', type: 'strength' },
      { name: 'Hamstring curls na stroji', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení hamstringů vsedě', type: 'mobility' },
      { name: 'Protažení hamstringů vestoje', type: 'mobility' },
    ],
  },

  // Svaly horní končetiny
  'Sval deltový': {
    strength: [
      { name: 'Tlaky s jednoručkami', type: 'strength' },
      { name: 'Bojové veslování', type: 'strength' },
      { name: 'Upažování s jednoručkami', type: 'strength' },
      { name: 'Tlaky s velkou činkou', type: 'strength' },
    ],
    mobility: [
      { name: 'Kroužení rameny', type: 'mobility' },
      { name: 'Protažení ramen na zdi', type: 'mobility' },
    ],
  },
  'Sval hákový': {
    strength: [
      { name: 'Bojové veslování', type: 'strength' },
      { name: 'Tlaky s jednoručkami', type: 'strength' },
      { name: 'Pull-up s úzkým úchopem', type: 'strength' },
      { name: 'Cable crossovers', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení ramen na zdi', type: 'mobility' },
      { name: 'Kroužení rameny', type: 'mobility' },
    ],
  },
  'Velký sval oblý': {
    strength: [
      { name: 'Veslování v předklonu', type: 'strength' },
      { name: 'Pull-up s širokým úchopem', type: 'strength' },
      { name: 'Tahy na kladce', type: 'strength' },
      { name: 'Bojové veslování', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení ramen na zdi', type: 'mobility' },
      { name: 'Kroužení rameny', type: 'mobility' },
    ],
  },
  'Dvojhlavý sval pažní': {
    strength: [
      { name: 'Biceps curls s činkami', type: 'strength' },
      { name: 'Kladivový úchop', type: 'strength' },
      { name: 'Concentrační biceps curls', type: 'strength' },
      { name: 'Biceps curls s velkou činkou', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení bicepsu na zdi', type: 'mobility' },
      { name: 'Protažení bicepsu s ručníkem', type: 'mobility' },
    ],
  },
  'Trojhlavý sval pažní': {
    strength: [
      { name: 'Triceps dips', type: 'strength' },
      { name: 'Triceps extensions', type: 'strength' },
      { name: 'Kliky s úzkým úchopem', type: 'strength' },
      { name: 'Triceps kickbacks', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení tricepsu přes hlavu', type: 'mobility' },
      { name: 'Protažení tricepsu na zdi', type: 'mobility' },
    ],
  },
  'Hluboký sval pažní': {
    strength: [
      { name: 'Biceps curls s činkami', type: 'strength' },
      { name: 'Kladivový úchop', type: 'strength' },
      { name: 'Concentrační biceps curls', type: 'strength' },
      { name: 'Cable curls', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení předloktí', type: 'mobility' },
      { name: 'Kroužení zápěstím', type: 'mobility' },
    ],
  },
  'Sval loketní': {
    strength: [
      { name: 'Triceps extensions', type: 'strength' },
      { name: 'Triceps dips', type: 'strength' },
      { name: 'Kliky s úzkým úchopem', type: 'strength' },
      { name: 'Overhead triceps extensions', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení tricepsu přes hlavu', type: 'mobility' },
      { name: 'Kroužení loktem', type: 'mobility' },
    ],
  },
  'Sval vřetenní': {
    strength: [
      { name: 'Biceps curls s činkami', type: 'strength' },
      { name: 'Kladivový úchop', type: 'strength' },
      { name: 'Cable curls', type: 'strength' },
      { name: 'Reverse curls', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení předloktí', type: 'mobility' },
      { name: 'Kroužení zápěstím', type: 'mobility' },
    ],
  },

  // Čtyřhlavý sval stehenní
  'Přímý sval stehenní': {
    strength: [
      { name: 'Dřepy', type: 'strength' },
      { name: 'Leg press', type: 'strength' },
      { name: 'Výpady', type: 'strength' },
      { name: 'Bulharské dřepy', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení čtyřhlavého svalu vestoje', type: 'mobility' },
      { name: 'Protažení čtyřhlavého svalu vkleče', type: 'mobility' },
    ],
  },
  'Prostřední hlava čtyřhlavého svalu stehenního': {
    strength: [
      { name: 'Dřepy', type: 'strength' },
      { name: 'Leg press', type: 'strength' },
      { name: 'Leg extensions', type: 'strength' },
      { name: 'Výpady', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení čtyřhlavého svalu vestoje', type: 'mobility' },
      { name: 'Protažení čtyřhlavého svalu vkleče', type: 'mobility' },
    ],
  },
  'Vnitřní hlava čtyřhlavého svalu stehenního': {
    strength: [
      { name: 'Dřepy s širokým postojem', type: 'strength' },
      { name: 'Leg press', type: 'strength' },
      { name: 'Leg extensions', type: 'strength' },
      { name: 'Výpady', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení čtyřhlavého svalu vestoje', type: 'mobility' },
      { name: 'Protažení čtyřhlavého svalu vkleče', type: 'mobility' },
    ],
  },
  'Zevní hlava čtyřhlavého svalu stehenního': {
    strength: [
      { name: 'Dřepy', type: 'strength' },
      { name: 'Leg press', type: 'strength' },
      { name: 'Leg extensions', type: 'strength' },
      { name: 'Bulharské dřepy', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení čtyřhlavého svalu vestoje', type: 'mobility' },
      { name: 'Protažení čtyřhlavého svalu vkleče', type: 'mobility' },
    ],
  },

  // Svaly v oblasti hrudníku
  'Velký prsní sval': {
    strength: [
      { name: 'Bench press', type: 'strength' },
      { name: 'Kliky', type: 'strength' },
      { name: 'Tlaky s jednoručkami', type: 'strength' },
      { name: 'Cable flyes', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení prsních svalů na zdi', type: 'mobility' },
      { name: 'Protažení prsních svalů v dveřním rámu', type: 'mobility' },
    ],
  },
  'Malý prsní sval': {
    strength: [
      { name: 'Kliky', type: 'strength' },
      { name: 'Tlaky s jednoručkami', type: 'strength' },
      { name: 'Cable crossovers', type: 'strength' },
      { name: 'Push-up variations', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení prsních svalů na zdi', type: 'mobility' },
      { name: 'Kroužení rameny', type: 'mobility' },
    ],
  },
  'Sval podklíčkový': {
    strength: [
      { name: 'Tlaky s jednoručkami', type: 'strength' },
      { name: 'Kliky', type: 'strength' },
      { name: 'Cable crossovers', type: 'strength' },
      { name: 'Incline press', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení ramen', type: 'mobility' },
      { name: 'Kroužení rameny', type: 'mobility' },
    ],
  },
  'Mezižeberní svaly': {
    strength: [
      { name: 'Dýchací cvičení', type: 'strength' },
      { name: 'Plank', type: 'strength' },
      { name: 'Side plank', type: 'strength' },
      { name: 'Dead bug', type: 'strength' },
    ],
    mobility: [
      { name: 'Hrudní mobilizace', type: 'mobility' },
      { name: 'Rotace trupu', type: 'mobility' },
    ],
  },
  'Bránice': {
    strength: [
      { name: 'Diafragmatické dýchání', type: 'strength' },
      { name: 'Plank', type: 'strength' },
      { name: 'Dead bug', type: 'strength' },
      { name: 'Vakuum', type: 'strength' },
    ],
    mobility: [
      { name: 'Hrudní mobilizace', type: 'mobility' },
      { name: 'Diafragmatické dýchání', type: 'mobility' },
    ],
  },
  'Přední pilovitý sval': {
    strength: [
      { name: 'Kliky', type: 'strength' },
      { name: 'Plank', type: 'strength' },
      { name: 'Push-up plus', type: 'strength' },
      { name: 'Scapular push-ups', type: 'strength' },
    ],
    mobility: [
      { name: 'Protrakce lopatky', type: 'mobility' },
      { name: 'Kroužení rameny', type: 'mobility' },
    ],
  },

  // Svaly bérce
  'Přední sval holenní': {
    strength: [
      { name: 'Dorsiflexe s gumou', type: 'strength' },
      { name: 'Chůze po patách', type: 'strength' },
      { name: 'Tibialis raises', type: 'strength' },
      { name: 'Calf raises na špičkách', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení předního holenního svalu', type: 'mobility' },
      { name: 'Kroužení kotníkem', type: 'mobility' },
    ],
  },
  'Zadní sval holenní': {
    strength: [
      { name: 'Plantární flexe s gumou', type: 'strength' },
      { name: 'Výpony na špičkách', type: 'strength' },
      { name: 'Single leg calf raises', type: 'strength' },
      { name: 'Seated calf raises', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení zadního holenního svalu', type: 'mobility' },
      { name: 'Protažení kotníku', type: 'mobility' },
    ],
  },
  'Dvojhlavý sval lýtkový': {
    strength: [
      { name: 'Výpony ve stoji', type: 'strength' },
      { name: 'Výpony vsedě', type: 'strength' },
      { name: 'Výpony na jedné noze', type: 'strength' },
      { name: 'Výpony s činkami', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení lýtka na zdi', type: 'mobility' },
      { name: 'Protažení lýtka na schodu', type: 'mobility' },
    ],
  },
  'Šikmý sval lýtkový': {
    strength: [
      { name: 'Výpony vsedě', type: 'strength' },
      { name: 'Výpony ve stoji', type: 'strength' },
      { name: 'Seated calf raises', type: 'strength' },
      { name: 'Calf raises na stroji', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení lýtka vsedě', type: 'mobility' },
      { name: 'Protažení lýtka na schodu', type: 'mobility' },
    ],
  },

  // Svaly krku
  'Zdvihač hlavy': {
    strength: [
      { name: 'Izometrické cvičení krku', type: 'strength' },
      { name: 'Neck flexion', type: 'strength' },
      { name: 'Neck extension', type: 'strength' },
      { name: 'Lateral neck flexion', type: 'strength' },
    ],
    mobility: [
      { name: 'Kroužení hlavou', type: 'mobility' },
      { name: 'Protažení krku', type: 'mobility' },
    ],
  },
  'Svaly kloněné': {
    strength: [
      { name: 'Dýchací cvičení', type: 'strength' },
      { name: 'Izometrické cvičení krku', type: 'strength' },
      { name: 'Neck flexion', type: 'strength' },
      { name: 'Lateral neck flexion', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení krku do strany', type: 'mobility' },
      { name: 'Kroužení hlavou', type: 'mobility' },
    ],
  },
  'Hluboké svaly krku': {
    strength: [
      { name: 'Izometrické cvičení krku', type: 'strength' },
      { name: 'Neck flexion', type: 'strength' },
      { name: 'Chin tucks', type: 'strength' },
      { name: 'Cervical stabilization', type: 'strength' },
    ],
    mobility: [
      { name: 'Kroužení hlavou', type: 'mobility' },
      { name: 'Protažení krku', type: 'mobility' },
    ],
  },

  // Flexory kyčelního kloubu
  'Napínač povázky stehenní': {
    strength: [
      { name: 'Leg raises', type: 'strength' },
      { name: 'Hip flexor raises', type: 'strength' },
      { name: 'Mountain climbers', type: 'strength' },
      { name: 'Reverse lunges', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení kyčelního flexoru', type: 'mobility' },
      { name: 'Kroužení kyčlí', type: 'mobility' },
    ],
  },
  'Sval krejčovský': {
    strength: [
      { name: 'Výpady', type: 'strength' },
      { name: 'Bulharské dřepy', type: 'strength' },
      { name: 'Leg raises', type: 'strength' },
      { name: 'Hip abduction', type: 'strength' },
    ],
    mobility: [
      { name: 'Butterfly stretch', type: 'mobility' },
      { name: 'Protažení v sedě s nohama do stran', type: 'mobility' },
    ],
  },
  'Bedrokyčlostehenní sval': {
    strength: [
      { name: 'Leg raises', type: 'strength' },
      { name: 'Hip flexor raises', type: 'strength' },
      { name: 'Mountain climbers', type: 'strength' },
      { name: 'Reverse lunges', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení kyčelního flexoru', type: 'mobility' },
      { name: 'Lunge stretch', type: 'mobility' },
    ],
  },

  // Svaly zad
  'Pilovitý sval zadní horní': {
    strength: [
      { name: 'Dýchací cvičení', type: 'strength' },
      { name: 'Plank', type: 'strength' },
      { name: 'Side plank', type: 'strength' },
      { name: 'Dead bug', type: 'strength' },
    ],
    mobility: [
      { name: 'Hrudní mobilizace', type: 'mobility' },
      { name: 'Rotace trupu', type: 'mobility' },
    ],
  },
  'Pilovitý sval zadní dolní': {
    strength: [
      { name: 'Dýchací cvičení', type: 'strength' },
      { name: 'Plank', type: 'strength' },
      { name: 'Side plank', type: 'strength' },
      { name: 'Dead bug', type: 'strength' },
    ],
    mobility: [
      { name: 'Hrudní mobilizace', type: 'mobility' },
      { name: 'Rotace trupu', type: 'mobility' },
    ],
  },
  'Napřimovače páteře': {
    strength: [
      { name: 'Hyperextenze', type: 'strength' },
      { name: 'Good morning', type: 'strength' },
      { name: 'Deadlift', type: 'strength' },
      { name: 'Superman', type: 'strength' },
    ],
    mobility: [
      { name: 'Kočičí hřbet', type: 'mobility' },
      { name: 'Protažení páteře vsedě', type: 'mobility' },
    ],
  },
  'Sval trapézový': {
    strength: [
      { name: 'Shrugs', type: 'strength' },
      { name: 'Veslování v předklonu', type: 'strength' },
      { name: 'Upright rows', type: 'strength' },
      { name: 'Tahy na kladce', type: 'strength' },
    ],
    mobility: [
      { name: 'Kroužení rameny', type: 'mobility' },
      { name: 'Protažení trapézů', type: 'mobility' },
    ],
  },
  'Široký sval zádový': {
    strength: [
      { name: 'Pull-up', type: 'strength' },
      { name: 'Veslování v předklonu', type: 'strength' },
      { name: 'Tahy na kladce', type: 'strength' },
      { name: 'Lat pulldown', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení zádových svalů', type: 'mobility' },
      { name: 'Rotace trupu', type: 'mobility' },
    ],
  },
  'Zdviháč lopatky': {
    strength: [
      { name: 'Shrugs', type: 'strength' },
      { name: 'Veslování v předklonu', type: 'strength' },
      { name: 'Upright rows', type: 'strength' },
      { name: 'Tahy na kladce', type: 'strength' },
    ],
    mobility: [
      { name: 'Kroužení rameny', type: 'mobility' },
      { name: 'Protažení lopatky', type: 'mobility' },
    ],
  },
  'Sval rombický': {
    strength: [
      { name: 'Veslování v předklonu', type: 'strength' },
      { name: 'Tahy na kladce', type: 'strength' },
      { name: 'Face pulls', type: 'strength' },
      { name: 'Reverse flyes', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení mezi lopatkami', type: 'mobility' },
      { name: 'Kroužení rameny', type: 'mobility' },
    ],
  },

  // Svaly v oblasti břicha
  'Přímý sval břišní': {
    strength: [
      { name: 'Sedy-lehy', type: 'strength' },
      { name: 'Crunches', type: 'strength' },
      { name: 'Plank', type: 'strength' },
      { name: 'Leg raises', type: 'strength' },
    ],
    mobility: [
      { name: 'Kočičí hřbet', type: 'mobility' },
      { name: 'Protažení břišních svalů', type: 'mobility' },
    ],
  },
  'Příčný sval břišní': {
    strength: [
      { name: 'Plank', type: 'strength' },
      { name: 'Dead bug', type: 'strength' },
      { name: 'Vakuum', type: 'strength' },
      { name: 'Side plank', type: 'strength' },
    ],
    mobility: [
      { name: 'Rotace trupu', type: 'mobility' },
      { name: 'Kočičí hřbet', type: 'mobility' },
    ],
  },
  'Šikmý sval břišní vnější': {
    strength: [
      { name: 'Side crunches', type: 'strength' },
      { name: 'Russian twists', type: 'strength' },
      { name: 'Side plank', type: 'strength' },
      { name: 'Woodchoppers', type: 'strength' },
    ],
    mobility: [
      { name: 'Rotace trupu', type: 'mobility' },
      { name: 'Protažení bočních břišních svalů', type: 'mobility' },
    ],
  },
  'Šikmý sval břišní vnitřní': {
    strength: [
      { name: 'Side crunches', type: 'strength' },
      { name: 'Russian twists', type: 'strength' },
      { name: 'Side plank', type: 'strength' },
      { name: 'Woodchoppers', type: 'strength' },
    ],
    mobility: [
      { name: 'Rotace trupu', type: 'mobility' },
      { name: 'Protažení bočních břišních svalů', type: 'mobility' },
    ],
  },
  'Čtyřhranný sval bederní': {
    strength: [
      { name: 'Side plank', type: 'strength' },
      { name: 'Lateral raises', type: 'strength' },
      { name: 'Woodchoppers', type: 'strength' },
      { name: 'Deadlift', type: 'strength' },
    ],
    mobility: [
      { name: 'Rotace trupu', type: 'mobility' },
      { name: 'Protažení bederní páteře', type: 'mobility' },
    ],
  },

  // Svaly hýžďové
  'Velký sval hýžďový': {
    strength: [
      { name: 'Dřepy', type: 'strength' },
      { name: 'Hip thrust', type: 'strength' },
      { name: 'Deadlift', type: 'strength' },
      { name: 'Bulharské dřepy', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení hýžďových svalů vsedě', type: 'mobility' },
      { name: 'Pigeon pose', type: 'mobility' },
    ],
  },
  'Střední sval hýžďový': {
    strength: [
      { name: 'Hip abduction', type: 'strength' },
      { name: 'Side leg raises', type: 'strength' },
      { name: 'Clamshells', type: 'strength' },
      { name: 'Hip thrust', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení hýžďových svalů vsedě', type: 'mobility' },
      { name: 'Pigeon pose', type: 'mobility' },
    ],
  },
  'Malý sval hýžďový': {
    strength: [
      { name: 'Hip abduction', type: 'strength' },
      { name: 'Side leg raises', type: 'strength' },
      { name: 'Clamshells', type: 'strength' },
      { name: 'Hip thrust', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení hýžďových svalů vsedě', type: 'mobility' },
      { name: 'Pigeon pose', type: 'mobility' },
    ],
  },

  // Ostatní svaly
  'Štíhlý sval stehenní': {
    strength: [
      { name: 'Výpady', type: 'strength' },
      { name: 'Bulharské dřepy', type: 'strength' },
      { name: 'Hip adduction', type: 'strength' },
      { name: 'Sumo squats', type: 'strength' },
    ],
    mobility: [
      { name: 'Butterfly stretch', type: 'mobility' },
      { name: 'Protažení v sedě s nohama do stran', type: 'mobility' },
    ],
  },

  // Svaly rotátorové manžety
  'Malý sval oblý': {
    strength: [
      { name: 'External rotation s gumou', type: 'strength' },
      { name: 'Face pulls', type: 'strength' },
      { name: 'Lateral raises', type: 'strength' },
      { name: 'Reverse flyes', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení ramen na zdi', type: 'mobility' },
      { name: 'Kroužení rameny', type: 'mobility' },
    ],
  },
  'Sval podlopatkový': {
    strength: [
      { name: 'Internal rotation s gumou', type: 'strength' },
      { name: 'Cable internal rotation', type: 'strength' },
      { name: 'Wall slides', type: 'strength' },
      { name: 'Pull-up s úzkým úchopem', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení ramen na zdi', type: 'mobility' },
      { name: 'Kroužení rameny', type: 'mobility' },
    ],
  },
  'Sval nadhřebenový': {
    strength: [
      { name: 'Lateral raises', type: 'strength' },
      { name: 'Upažování s jednoručkami', type: 'strength' },
      { name: 'Cable lateral raises', type: 'strength' },
      { name: 'Empty can exercise', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení ramen na zdi', type: 'mobility' },
      { name: 'Kroužení rameny', type: 'mobility' },
    ],
  },
  'Sval podhřebenový': {
    strength: [
      { name: 'External rotation s gumou', type: 'strength' },
      { name: 'Face pulls', type: 'strength' },
      { name: 'Reverse flyes', type: 'strength' },
      { name: 'Lateral raises', type: 'strength' },
    ],
    mobility: [
      { name: 'Protažení ramen na zdi', type: 'mobility' },
      { name: 'Kroužení rameny', type: 'mobility' },
    ],
  },
};

/**
 * Výchozí cviky pro svaly, které nemají specifické cviky
 */
const defaultExercises: MuscleExercises = {
  strength: [
    { name: 'Cviky s vlastní vahou', type: 'strength' },
    { name: 'Cviky s činkami', type: 'strength' },
    { name: 'Cviky na stroji', type: 'strength' },
    { name: 'Funkční trénink', type: 'strength' },
  ],
  mobility: [
    { name: 'Dynamické protažení', type: 'mobility' },
    { name: 'Statické protažení', type: 'mobility' },
  ],
};

/**
 * Získá cviky pro daný sval
 */
export function getMuscleExercises(muscleName: string): MuscleExercises {
  return muscleExercisesMap[muscleName] || defaultExercises;
}
