/**
 * AttendX Storage & Persistence Utility
 * 
 * Provides fail-safe browser localStorage interactions, data validation,
 * sample data initialization, and JSON import/export functions.
 */

export const STORAGE_KEYS = {
  SUBJECTS: "attendx_subjects_v1",
  SETTINGS: "attendx_settings_v1",
  CHAT_HISTORY: "attendx_chat_history_v1",
};

export const DEFAULT_SETTINGS = {
  globalTarget: 75,
  theme: "light",
  notificationsEnabled: true,
};

/**
 * 5 Pre-configured realistic B.Tech Computer Science subjects
 * designed for instant viva demonstrations.
 */
export const SAMPLE_SUBJECTS = [
  {
    id: "subj_cs301",
    name: "Data Structures & Algorithms",
    code: "CS-301",
    teacher: "Dr. R. K. Sharma",
    color: "#6366f1", // Indigo
    attended: 28,
    total: 32,
    target: 75,
    history: [
      { id: "h1", date: "2026-11-17", action: "present", timestamp: Date.now() - 345600000 },
      { id: "h2", date: "2026-11-18", action: "present", timestamp: Date.now() - 259200000 },
      { id: "h3", date: "2026-11-19", action: "absent", timestamp: Date.now() - 172800000 },
      { id: "h4", date: "2026-11-20", action: "present", timestamp: Date.now() - 86400000 },
    ],
  },
  {
    id: "subj_cs302",
    name: "Database Management Systems",
    code: "CS-302",
    teacher: "Prof. Ananya Gupta",
    color: "#06b6d4", // Cyan
    attended: 22,
    total: 30,
    target: 75,
    history: [
      { id: "h5", date: "2026-11-16", action: "absent", timestamp: Date.now() - 432000000 },
      { id: "h6", date: "2026-11-18", action: "absent", timestamp: Date.now() - 259200000 },
      { id: "h7", date: "2026-11-20", action: "present", timestamp: Date.now() - 86400000 },
    ],
  },
  {
    id: "subj_cs303",
    name: "Operating Systems",
    code: "CS-303",
    teacher: "Dr. Vikram Joshi",
    color: "#10b981", // Emerald
    attended: 31,
    total: 35,
    target: 75,
    history: [
      { id: "h8", date: "2026-11-15", action: "present", timestamp: Date.now() - 518400000 },
      { id: "h9", date: "2026-11-17", action: "present", timestamp: Date.now() - 345600000 },
      { id: "h10", date: "2026-11-19", action: "present", timestamp: Date.now() - 172800000 },
    ],
  },
  {
    id: "subj_cs304",
    name: "Computer Networks",
    code: "CS-304",
    teacher: "Er. Meenakshi Rao",
    color: "#f59e0b", // Amber (Warning threshold demo)
    attended: 19,
    total: 25,
    target: 75,
    history: [
      { id: "h11", date: "2026-11-14", action: "present", timestamp: Date.now() - 604800000 },
      { id: "h12", date: "2026-11-18", action: "cancelled", timestamp: Date.now() - 259200000 },
      { id: "h13", date: "2026-11-20", action: "absent", timestamp: Date.now() - 86400000 },
    ],
  },
  {
    id: "subj_cs305",
    name: "Discrete Mathematics",
    code: "MA-301",
    teacher: "Prof. S. N. Mukherjee",
    color: "#ec4899", // Pink (Shortage demo)
    attended: 14,
    total: 22,
    target: 75,
    history: [
      { id: "h14", date: "2026-11-16", action: "absent", timestamp: Date.now() - 432000000 },
      { id: "h15", date: "2026-11-17", action: "absent", timestamp: Date.now() - 345600000 },
      { id: "h16", date: "2026-11-19", action: "absent", timestamp: Date.now() - 172800000 },
    ],
  },
];

/**
 * Validates a single subject object structure to ensure data integrity.
 * 
 * @param {any} item - Raw object to validate
 * @returns {Object|null} Sanitized subject object or null if invalid
 */
export function validateSubject(item) {
  if (!item || typeof item !== "object") return null;

  const name = typeof item.name === "string" ? item.name.trim() : "";
  if (!name) return null;

  const id = typeof item.id === "string" && item.id.length > 0
    ? item.id
    : `subj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const attended = Math.max(0, parseInt(item.attended, 10) || 0);
  const total = Math.max(attended, parseInt(item.total, 10) || 0);
  const target = Math.min(100, Math.max(1, parseInt(item.target, 10) || 75));

  const code = typeof item.code === "string" ? item.code.trim() : "";
  const teacher = typeof item.teacher === "string" ? item.teacher.trim() : "";
  const color = typeof item.color === "string" && item.color.startsWith("#") ? item.color : "#6366f1";

  const history = Array.isArray(item.history)
    ? item.history.filter((h) => h && typeof h === "object" && h.action)
    : [];

  return {
    id,
    name,
    code,
    teacher,
    color,
    attended,
    total,
    target,
    history,
  };
}

/**
 * Safely loads data from localStorage with JSON parse error catching
 * and automatic schema validation.
 * 
 * @param {string} key - localStorage storage key
 * @param {any} fallback - Default fallback value if read fails
 * @returns {any} Stored value or fallback
 */
export function safeGetStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed !== null ? parsed : fallback;
  } catch (error) {
    console.warn(`[AttendX Storage] Corrupted data found in key "${key}". Resetting to fallback.`, error);
    return fallback;
  }
}

/**
 * Safely saves data to localStorage.
 * 
 * @param {string} key - localStorage storage key
 * @param {any} value - Value to serialize and store
 * @returns {boolean} True if successfully written, false otherwise
 */
export function safeSetStorage(key, value) {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`[AttendX Storage] Error writing to key "${key}":`, error);
    return false;
  }
}

/**
 * Exports current attendance dataset as a formatted JSON file download.
 * 
 * @param {Array<Object>} subjects - Array of subject objects
 * @param {Object} settings - User settings
 */
export function exportDataAsJSON(subjects, settings) {
  const payload = {
    app: "AttendX",
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    settings: settings || DEFAULT_SETTINGS,
    subjects: subjects || [],
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `attendx_backup_${new Date().toISOString().split("T")[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Validates and imports a JSON string into AttendX data structures.
 * 
 * @param {string} jsonString - The raw JSON string from uploaded file
 * @returns {{ success: boolean, subjects?: Array<Object>, settings?: Object, message: string }}
 */
export function parseAndValidateImport(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== "object") {
      return { success: false, message: "File does not contain valid JSON object structure." };
    }

    // Check subjects array
    const rawSubjects = Array.isArray(parsed.subjects)
      ? parsed.subjects
      : Array.isArray(parsed)
      ? parsed
      : null;

    if (!rawSubjects) {
      return { success: false, message: "Could not locate subjects array in the uploaded JSON." };
    }

    const validatedSubjects = rawSubjects
      .map(validateSubject)
      .filter((s) => s !== null);

    if (validatedSubjects.length === 0) {
      return { success: false, message: "No valid subject records could be extracted from this file." };
    }

    const settings = parsed.settings && typeof parsed.settings === "object"
      ? {
          globalTarget: Math.min(100, Math.max(1, parseInt(parsed.settings.globalTarget, 10) || 75)),
          theme: parsed.settings.theme === "dark" ? "dark" : "light",
          notificationsEnabled: parsed.settings.notificationsEnabled !== false,
        }
      : DEFAULT_SETTINGS;

    return {
      success: true,
      subjects: validatedSubjects,
      settings,
      message: `Successfully imported ${validatedSubjects.length} subjects!`,
    };
  } catch (error) {
    return { success: false, message: `Invalid JSON syntax: ${error.message}` };
  }
}
