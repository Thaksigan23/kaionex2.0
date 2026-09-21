"use client";

import { createContext, useContext } from "react";

/** Presentation-only timeline. Existing demos keep their autonomous mode elsewhere. */
export const StoryPlaybackContext = createContext<number | null>(null);
export const useStoryPlayback = () => useContext(StoryPlaybackContext);
