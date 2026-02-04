// Return types for analytics data

// ===========================
// Time Series Data
// ===========================
export interface TimeSeriesData {
  date: string;
  clicks: number;
  sessions?: number;
  visitors?: number;
}

// ===========================
// Breakdown Data Types
// ===========================
export interface ClicksByCountry {
  country: string;
  clicks: number;
}

export interface ClicksByDevice {
  device: string;
  clicks: number;
}

export interface ClicksByBrowser {
  browser: string;
  clicks: number;
}

export interface ClicksByOS {
  os: string;
  clicks: number;
}

export interface ClicksByReferrer {
  referrer: string;
  clicks: number;
}

export interface ClicksByUTMSource {
  source: string;
  clicks: number;
}

export interface ClicksByUTMMedium {
  medium: string;
  clicks: number;
}

export interface ClicksByUTMCampaign {
  campaign: string;
  clicks: number;
}

export interface TopLink {
  link_id: string;
  clicks: number;
}

// ===========================
// Link Stats Response
// ===========================
export interface LinkStatsData {
  linkId: string;
  totalClicks: number;
  uniqueVisitors: number;
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
  clicksChange: number;
  sessionsChange: number;
  visitorsChange: number;
  bounceRateChange: number;
  sessionDurationChange: number;
  clicksOverTime: TimeSeriesData[];
  clicksByCountry: ClicksByCountry[];
  clicksByDevice: ClicksByDevice[];
  clicksByBrowser: ClicksByBrowser[];
  clicksByOS: ClicksByOS[];
  clicksByReferrer: ClicksByReferrer[];
  clicksByUTMSource: ClicksByUTMSource[];
  clicksByUTMMedium: ClicksByUTMMedium[];
  clicksByUTMCampaign: ClicksByUTMCampaign[];
}

// ===========================
// Profile Stats Response
// ===========================
export interface ProfileStatsData {
  profileId: string;
  totalClicks: number;
  uniqueVisitors: number;
  topLinks: TopLink[];
  clicksOverTime: TimeSeriesData[];
  clicksByReferrer: ClicksByReferrer[];
  clicksByUTMSource: ClicksByUTMSource[];
  clicksByUTMMedium: ClicksByUTMMedium[];
  clicksByUTMCampaign: ClicksByUTMCampaign[];
}

// ===========================
// Link Click Counts
// ===========================
export interface LinksClickCounts {
  [linkId: string]: number;
}
