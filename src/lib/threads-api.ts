const THREADS_APP_ID = process.env.THREADS_APP_ID;
const THREADS_APP_SECRET = process.env.THREADS_APP_SECRET;
const THREADS_API_VERSION = "v1.0";
const THREADS_API_BASE = `https://graph.threads.net/${THREADS_API_VERSION}`;

export type ThreadsMediaType = "TEXT" | "IMAGE" | "VIDEO" | "CAROUSEL";

export type ThreadsPostInput = {
  text?: string;
  mediaUrl?: string;
  mediaType?: ThreadsMediaType;
};

export type ThreadsPublishResult = {
  success: boolean;
  postId?: string;
  error?: string;
};

function getAccessToken(): string | undefined {
  if (THREADS_APP_ID && THREADS_APP_SECRET) {
    return `${THREADS_APP_ID}|${THREADS_APP_SECRET}`;
  }
  return undefined;
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 2
): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (!response.ok && retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

export async function createThreadsPost(
  input: ThreadsPostInput
): Promise<ThreadsPublishResult> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return {
      success: false,
      error: "Missing Threads credentials (THREADS_APP_ID / THREADS_APP_SECRET)",
    };
  }

  const params = new URLSearchParams();
  params.set("access_token", accessToken);

  if (input.text) {
    params.set("text", input.text);
  }

  if (input.mediaUrl) {
    params.set("media_type", input.mediaType ?? "IMAGE");
    params.set("image_url", input.mediaUrl);
  }

  try {
    const createUrl = `${THREADS_API_BASE}/me/threads?${params.toString()}`;
    const createResponse = await fetchWithRetry(createUrl, { method: "POST" });
    const createResult = (await createResponse.json()) as {
      id?: string;
      error?: { message: string };
    };

    if (!createResponse.ok || createResult.error) {
      return {
        success: false,
        error: createResult.error?.message ?? `Threads creation failed (${createResponse.status})`,
      };
    }

    const creationId = createResult.id;
    if (!creationId) {
      return { success: false, error: "Threads creation returned no container ID" };
    }

    const publishUrl = `${THREADS_API_BASE}/me/threads_publish?creation_id=${creationId}&access_token=${accessToken}`;
    const publishResponse = await fetchWithRetry(publishUrl, { method: "POST" });
    const publishResult = (await publishResponse.json()) as {
      id?: string;
      error?: { message: string };
    };

    if (!publishResponse.ok || publishResult.error) {
      return {
        success: false,
        error: publishResult.error?.message ?? `Threads publish failed (${publishResponse.status})`,
      };
    }

    return {
      success: true,
      postId: publishResult.id,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[threads-api] Failed to create post:", message);
    return { success: false, error: message };
  }
}

export async function getThreadsInsights(postId?: string): Promise<{
  success: boolean;
  data?: unknown;
  error?: string;
}> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return {
      success: false,
      error: "Missing Threads credentials (THREADS_APP_ID / THREADS_APP_SECRET)",
    };
  }

  try {
    const url = postId
      ? `${THREADS_API_BASE}/${postId}/insights?access_token=${accessToken}`
      : `${THREADS_API_BASE}/me/threads?fields=id,media_type,permalink,username,timestamp&access_token=${accessToken}`;

    const response = await fetchWithRetry(url, { method: "GET" });
    const result = (await response.json()) as { error?: { message: string } };

    if (!response.ok || result.error) {
      return {
        success: false,
        error: result.error?.message ?? `Threads insights failed (${response.status})`,
      };
    }

    return { success: true, data: result };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[threads-api] Failed to fetch insights:", message);
    return { success: false, error: message };
  }
}
