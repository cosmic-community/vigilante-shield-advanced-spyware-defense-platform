import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all security guides
export async function getSecurityGuides() {
  try {
    const response = await cosmic.objects
      .find({ type: 'security-guides' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch security guides');
  }
}

// Fetch a single security guide by slug
export async function getSecurityGuide(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'security-guides',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch security guide');
  }
}

// Fetch all threat categories
export async function getThreatCategories() {
  try {
    const response = await cosmic.objects
      .find({ type: 'threat-categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch threat categories');
  }
}

// Fetch a single threat category by slug
export async function getThreatCategory(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'threat-categories',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch threat category');
  }
}

// Fetch all FAQs
export async function getFAQs() {
  try {
    const response = await cosmic.objects
      .find({ type: 'faqs' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort by priority if available
    const faqs = response.objects.sort((a: any, b: any) => {
      const priorityA = a.metadata?.priority || 999;
      const priorityB = b.metadata?.priority || 999;
      return priorityA - priorityB;
    });
    
    return faqs;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch FAQs');
  }
}

// Fetch FAQs by category
export async function getFAQsByCategory(category: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'faqs',
        'metadata.category': category
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch FAQs');
  }
}