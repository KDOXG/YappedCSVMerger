# (Incomplete) Yapped CSV Merger, done with React App
## Check /src/utils/CsvComparator.js for the main function.

# What it does?

It manages .CSVs table files generated through Yapped Rune Bear export option for Elden Ring regulation.bin modding.
It uses three files:
* the original .CSV extracted from your original regulation.bin file located at ELDEN RING/Game directory,
* the 1st modded .CSV,
* the 2nd modded .CSV.

It will merge the contents of the 1st modded .CSV with the 2nd, generating a table file with both contents. The original .CSV is required as a base file to check if a line from any of the modded is modified or not.
The modded .CSV table file can be an entire modded table extracted with Yapped through export option (most common among mods released on Nexus), or a single line with the modified content to include in the file (for example, the "put this line in" tables from AntiSteak's mod 'Sekiro Deflecting', although it's hidden now on Nexus).
If a conflict is found, both lines are planned to be selected to show in the interface to let the user select which line they want to keep.
The planned export is the modified content of the 2nd modded .CSV inside of the 1st modded .CSV overwriting the unmodified lines.
