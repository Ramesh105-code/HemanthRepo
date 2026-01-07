async function fetchWithRetry(url, options = {}, maxRetries = 3, delay = 500) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (maxRetries === 0) {
      console.error('All retry attempts failed.');
      throw error;
    }
    const backoffDelay = delay * 2;

    console.warn(
      `Fetch failed. Retrying in ${delay}ms... (${maxRetries} retries left)`
    );

    await new Promise(resolve => setTimeout(resolve, delay));

    return fetchWithRetry(url, options, maxRetries - 1, backoffDelay);
  }
}
