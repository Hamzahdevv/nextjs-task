"use client"
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('/api/shorten', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    setShortUrl(data.shortUrl);
    setUrl('');
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && <a href={shortUrl} target="_blank" rel="noopener noreferrer">Short URL: {shortUrl}</a>}
      {loading && <p>Loading...</p>}
    </div>
  );
}
