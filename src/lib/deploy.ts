import toast from 'react-hot-toast';

// Storage key for site ID
const SITE_ID = '592baa27-5eea-4870-9909-89c8331c22cd';
const DEPLOY_ID_KEY = 'netlify_deploy_id';

interface DeploymentStatus {
  ready: boolean;
  url?: string;
  claimed?: boolean;
  claim_url?: string;
  deploy_id?: string;
}

export async function getDeploymentStatus(): Promise<DeploymentStatus> {
  try {
    const response = await fetch('/_backend/deploy/status');
    if (!response.ok) {
      throw new Error('Failed to get deployment status');
    }
    
    if (response.headers.get('content-length') === '0') {
      return { ready: false };
    }
    
    const data = await response.json();
    
    // Store deploy ID if provided
    if (data.deploy_id) {
      localStorage.setItem(DEPLOY_ID_KEY, data.deploy_id);
    }
    
    return {
      ready: data.ready || false,
      url: data.url,
      claimed: data.claimed,
      claim_url: data.claim_url,
      deploy_id: data.deploy_id
    };
  } catch (error) {
    console.error('Error checking deployment status:', error);
    throw error;
  }
}

export async function deployToNetlify(options: {
  command: string;
  output: string;
}): Promise<void> {
  try {
    const response = await fetch('/_backend/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider: 'netlify',
        site_id: SITE_ID,
        build: {
          command: options.command,
          output: options.output
        }
      })
    });

    if (!response.ok) {
      throw new Error('Deploy failed');
    }

    // Check if response is empty
    if (response.headers.get('content-length') === '0') {
      toast.success('Deployment started...');
      return;
    }

    try {
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Store new deploy ID if provided
      if (data.deploy_id) {
        localStorage.setItem(DEPLOY_ID_KEY, data.deploy_id);
      }
      
      toast.success('Deployment started...');
    } catch (parseError) {
      // If we can't parse the response but the status was ok,
      // we'll still consider it a success
      if (response.ok) {
        toast.success('Deployment started...');
      } else {
        throw new Error('Invalid response from deploy endpoint');
      }
    }
  } catch (error) {
    console.error('Deploy error:', error);
    toast.error('Failed to deploy: ' + (error instanceof Error ? error.message : 'Unknown error'));
    throw error;
  }
}