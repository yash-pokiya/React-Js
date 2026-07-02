import React, { useEffect, useState } from 'react';

function Github() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching data
    fetch('https://api.github.com/users/yash-pokiya')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[600px] items-center justify-center bg-slate-50 text-xl text-indigo-600 font-mono">
        <div className="animate-pulse font-medium">Loading GitHub Profile...</div>
      </div>
    );
  }

  if (!data) return null;

  // Format the date nicely
  const joinedDate = new Date(data.created_at).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Profile Card */}
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/80 border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-6 border-b border-slate-100 pb-6">
          <div className="relative group">
            {/* Gradient border effect */}
            <div className="absolute -inset-0.5 rounded-full bg-linear-to-r from-indigo-500 to-violet-500 opacity-60 blur transition duration-300 group-hover:opacity-100"></div>
            <img 
              src={data.avatar_url} 
              alt={`${data.name || data.login}'s avatar`} 
              className="relative w-28 h-28 rounded-full object-cover border-4 border-white shadow-sm"
            />
          </div>
          
          <div className="flex-1 space-y-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">{data.name || 'GitHub User'}</h1>
              <p className="text-indigo-600 font-mono text-sm font-medium">@{data.login}</p>
            </div>
            {data.bio && <p className="text-slate-600 text-sm leading-relaxed max-w-sm">{data.bio}</p>}
            <p className="text-xs font-medium text-slate-400">Joined {joinedDate}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 text-center">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 transition-colors hover:bg-slate-100/50">
            <span className="block text-2xl font-bold text-slate-800">{data.public_repos}</span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Repos</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 transition-colors hover:bg-slate-100/50">
            <span className="block text-2xl font-bold text-slate-800">{data.public_gists}</span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gists</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 transition-colors hover:bg-slate-100/50">
            <span className="block text-2xl font-bold text-slate-800">{data.followers}</span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Followers</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 transition-colors hover:bg-slate-100/50">
            <span className="block text-2xl font-bold text-slate-800">{data.following}</span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Following</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a 
            href={data.html_url} 
            target="_blank" 
            rel="noreferrer"
            className="flex-1 text-center bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium py-2.5 px-4 rounded-xl transition duration-200 text-sm shadow-sm"
          >
            View Profile
          </a>
          <button className="flex-1 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold py-2.5 px-4 rounded-xl transition duration-200 text-sm shadow-lg shadow-indigo-600/15">
            Follow
          </button>
        </div>

      </div>
    </div>
  );
}
  
export default Github;

export const githubInfoLoader = async () => {
  const response = await fetch('https://api.github.com/users/yash-pokiya');
  if (!response.ok) throw new Error('Failed to fetch github info');
  return response.json();
};