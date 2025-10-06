// Type definitions for Cosmic objects

// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Security Guide interface
export interface SecurityGuide extends CosmicObject {
  type: 'security-guides';
  metadata: {
    guide_title: string;
    platform: {
      key: string;
      value: 'iOS' | 'Android' | 'Both Platforms';
    };
    difficulty_level: {
      key: string;
      value: 'Beginner' | 'Intermediate' | 'Advanced';
    };
    introduction: string;
    steps: Array<{
      step: number;
      title: string;
      instruction: string;
      explanation: string;
    }>;
    why_this_matters: string;
    estimated_time?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Threat Category interface
export interface ThreatCategory extends CosmicObject {
  type: 'threat-categories';
  metadata: {
    threat_name: string;
    severity_level: {
      key: string;
      value: 'Low' | 'Medium' | 'High' | 'Critical';
    };
    description: string;
    how_it_works: string;
    protection_methods: string;
    related_guides?: SecurityGuide[];
    icon?: {
      url: string;
      imgix_url: string;
    };
  };
}

// FAQ interface
export interface FAQ extends CosmicObject {
  type: 'faqs';
  metadata: {
    question: string;
    answer: string;
    category: {
      key: string;
      value: 'General' | 'Privacy' | 'Threats' | 'Tools';
    };
    priority?: number;
  };
}

// Link analysis result interface
export interface LinkAnalysisResult {
  url: string;
  risk_level: 'low' | 'medium' | 'high';
  risk_score: number;
  threats_found: string[];
  domain_age_days?: number;
  is_suspicious: boolean;
  analysis_details: {
    domain_check: string;
    ssl_check: string;
    threat_db_check: string;
    reputation_check: string;
  };
  recommendations: string[];
}

// Progress tracking interface
export interface GuideProgress {
  guideId: string;
  completedSteps: number[];
  lastUpdated: string;
}