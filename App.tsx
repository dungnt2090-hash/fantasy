import React, { useEffect, useState } from 'react';
import { LeagueTable } from './components/LeagueTable';
import { LoadingSpinner } from './components/LoadingSpinner';
import { fetchLeagueData, fetchBootstrapStatic, fetchLiveEventData } from './services/fplService';
import { ClassicLeagueResponse, BootstrapStaticResponse, LiveEventResponse, SortConfig } from './types';
import { MOCK_LEAGUE_DATA } from './constants';

const App: React.FC = () => {
  const [leagueData, setLeagueData] = useState<ClassicLeagueResponse | null>(null);
  const [bootstrapData, setBootstrapData] = useState<BootstrapStaticResponse | null>(null);
  const [globalLiveData, setGlobalLiveData] = useState<LiveEventResponse | null>(null);
  const [currentEventId, setCurrentEventId] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState<boolean>(false);
  
  // State for sorting
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'gw', direction: 'desc' });
  
  // State for Highlight (Simulated logic for "current user")
  const [highlightEntryId, setHighlightEntryId] = useState<number | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setUsingMockData(false);
        setError(null);

        // Fetch League and Bootstrap data in parallel
        let leagueRes: ClassicLeagueResponse;
        try {
             leagueRes = await fetchLeagueData();
        } catch (e) {
             console.error("League fetch failed completely, using mock", e);
             leagueRes = MOCK_LEAGUE_DATA;
             setUsingMockData(true);
        }

        const bootstrapRes = await fetchBootstrapStatic();
        
        // Identify Current Event
        const currentEvent = bootstrapRes.events.find(e => e.is_current) || bootstrapRes.events[bootstrapRes.events.length - 1];
        const evtId = currentEvent ? currentEvent.id : 1;
        setCurrentEventId(evtId);

        // Fetch Live Data for the current event immediately for table display
        let liveRes: LiveEventResponse | null = null;
        try {
            liveRes = await fetchLiveEventData(evtId);
        } catch (e) {
            console.warn("Failed to fetch global live data", e);
        }
        
        setLeagueData(leagueRes);
        setBootstrapData(bootstrapRes);
        setGlobalLiveData(liveRes);

      } catch (err) {
        setError('Unexpected error loading application.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Derive current gameweek name
  const currentGameweekName = bootstrapData?.events.find(e => e.id === currentEventId)?.name;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-12">
      
      <main className="max-w-[1400px] mx-auto px-4 pt-6 relative z-20">
        
        {usingMockData && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded shadow-sm">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            <strong>Connection Issue:</strong> Unable to connect to FPL API (likely due to CORS restrictions). Showing demo data instead of League 590736.
                        </p>
                    </div>
                </div>
            </div>
        )}

        {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded shadow-sm">
                <div className="flex">
                    <div className="flex-shrink-0">
                         <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : leagueData ? (
          <div className="space-y-6">
            
            {/* League Info Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-fpl-purple flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{leagueData.league.name}</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">Classic League</span>
                    <span>•</span>
                    <span>ID: {leagueData.league.id}</span>
                    {currentGameweekName && (
                        <>
                           <span>•</span>
                           <span className="font-semibold text-fpl-purple">{currentGameweekName}</span>
                        </>
                    )}
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium text-fpl-purple">
                      {new Date(leagueData.last_updated_data).toLocaleDateString()}
                  </p>
              </div>
            </div>

            {/* Main Table */}
            <div>
                <LeagueTable 
                    standings={leagueData.standings} 
                    sortConfig={sortConfig}
                    onSortChange={setSortConfig}
                    highlightEntryId={highlightEntryId}
                    bootstrapData={bootstrapData}
                    liveData={globalLiveData}
                    currentEventId={currentEventId}
                    onSelectManager={() => {}} // No-op as per new hover requirement
                />
            </div>

          </div>
        ) : null}
      </main>

    </div>
  );
};

export default App;