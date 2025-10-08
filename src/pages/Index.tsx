import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Server, MessageCircle, Copy, ExternalLink, FileText, Download, Map, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-40 shadow-2xl">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                  Sentience AI - Scum Server
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg blur opacity-25"></div>
              </div>
              <div className="text-sm sm:text-lg lg:text-xl font-bold text-slate-200"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:block text-xs sm:text-sm text-slate-400 font-medium">
              Navigate • Survive • Conquer
              </div>
              <Button
                onClick={() => window.open('/sentience_launcher.exe', '_blank')}
                variant="outline"
                size="sm"
                className="border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/10 font-semibold"
              >
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">OFFICIAL LAUNCHER</span>
                <span className="sm:hidden">LAUNCHER</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Server Information Section */}
      <section className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-2">
              Join Our SCUM Server
            </h3>
            <p className="text-slate-400 text-sm sm:text-base">
              Experience the ultimate survival challenge with our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {/* Server IP Card */}
            <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-400/20 backdrop-blur-sm">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <Server className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-200">Server IP</h4>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 mb-3">
                  <code className="text-emerald-300 font-mono text-sm sm:text-base">
                    70.55.144.65:7779
                  </code>
                </div>
                <Button
                  onClick={() => copyToClipboard('70.55.144.65:7779')}
                  variant="outline"
                  size="sm"
                  className="w-full border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/10"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Server IP
                </Button>
              </div>
            </Card>

            {/* Discord Card */}
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-400/20 backdrop-blur-sm">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-200">Discord Community</h4>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  Join our Discord server for updates, support, and community discussions
                </p>
                <Button
                  onClick={() => window.open('https://discord.gg/7xY9s6HH7J', '_blank')}
                  variant="outline"
                  size="sm"
                  className="w-full border-blue-400/50 text-blue-300 hover:bg-blue-500/10"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Join Discord
                </Button>
              </div>
            </Card>

            {/* Server Rules Card */}
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-400/20 backdrop-blur-sm">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-200">Server Rules</h4>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  Read our comprehensive server rules and guidelines for fair play
                </p>
                <Button
                  onClick={() => navigate('/server-rules')}
                  variant="outline"
                  size="sm"
                  className="w-full border-purple-400/50 text-purple-300 hover:bg-purple-500/10"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Rules
                </Button>
              </div>
            </Card>

            {/* Quest Cartographer Card */}
            <Card className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border-teal-400/20 backdrop-blur-sm">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-teal-500/20 rounded-lg">
                    <Map className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-200">Quest Cartographer</h4>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  Interactive quest tree and mission tracker for all server quests
                </p>
                <Button
                  onClick={() => navigate('/quest-cartographer')}
                  variant="outline"
                  size="sm"
                  className="w-full border-teal-400/50 text-teal-300 hover:bg-teal-500/10"
                >
                  <Map className="h-4 w-4 mr-2" />
                  View Quests
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>


      {/* Server Specs Section */}
      <section className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-2">
                Raw Performance Specs 🚀
              </h3>
              <p className="text-slate-400 text-sm sm:text-base">
                Enterprise-grade hardware for uncompromising performance
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {/* CPU Card */}
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-400/20 backdrop-blur-sm">
                <div className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-300 mb-1">48</div>
                    <div className="text-xs sm:text-sm text-blue-200 font-medium mb-2">CORES</div>
                    <div className="text-slate-300 text-sm font-medium">Intel Xeon Gold</div>
                  </div>
                </div>
              </Card>

              {/* RAM Card */}
              <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-400/20 backdrop-blur-sm">
                <div className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-300 mb-1">500</div>
                    <div className="text-xs sm:text-sm text-emerald-200 font-medium mb-2">GB ECC RAM</div>
                    <div className="text-slate-300 text-sm font-medium">Error Correcting</div>
                  </div>
                </div>
              </Card>

              {/* GPU Card */}
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/20 backdrop-blur-sm">
                <div className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-300 mb-1">16×</div>
                    <div className="text-xs sm:text-sm text-purple-200 font-medium mb-2">TESLA A100</div>
                    <div className="text-slate-300 text-sm font-medium">AI Tasks</div>
                  </div>
                </div>
              </Card>

              {/* Storage Card */}
              <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-400/20 backdrop-blur-sm">
                <div className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-orange-300 mb-1">12</div>
                    <div className="text-xs sm:text-sm text-orange-200 font-medium mb-2">TB NVME</div>
                    <div className="text-slate-300 text-sm font-medium">RAID-0</div>
                  </div>
                </div>
              </Card>

              {/* Tick Rate Card */}
              <Card className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-400/20 backdrop-blur-sm">
                <div className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-yellow-300 mb-1">10 ↔ 30</div>
                    <div className="text-xs sm:text-sm text-yellow-200 font-medium mb-2">TPS</div>
                    <div className="text-slate-300 text-sm font-medium">Adaptive</div>
                  </div>
                </div>
              </Card>

              {/* Players Card */}
              <Card className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border-indigo-400/20 backdrop-blur-sm">
                <div className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-indigo-300 mb-1">50</div>
                    <div className="text-xs sm:text-sm text-indigo-200 font-medium mb-2">PLAYERS</div>
                    <div className="text-slate-300 text-sm font-medium">Capacity</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Performance Summary */}
            <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50 backdrop-blur-sm">
              <div className="p-6 sm:p-8">
                <div className="text-center">
                  <h4 className="text-lg sm:text-xl font-semibold text-slate-200 mb-3">
                    Performance Guarantee
                  </h4>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Head-room for <span className="text-emerald-300 font-semibold">50 players</span>, 
                    <span className="text-blue-300 font-semibold"> huge puppet hordes</span>, 
                    <span className="text-purple-300 font-semibold"> live economy math</span>, and 
                    <span className="text-orange-300 font-semibold"> zero rubber-banding</span>.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Server Settings Section */}
      <section className="bg-slate-800/30 backdrop-blur-xl">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-2">
                Server Configuration ⚙️
              </h3>
              <p className="text-slate-400 text-sm sm:text-base">
                Optimized settings for the ultimate SCUM experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Loot Settings Card */}
              <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-400/20 backdrop-blur-sm">
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-4">
                    <div className="text-3xl sm:text-4xl font-bold text-amber-300 mb-2">
                      3.5× - 5.0×
                    </div>
                    <h4 className="text-lg font-semibold text-slate-200 mb-2">
                      Variable Loot Multiplier
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">AI Controlled:</span>
                      <span className="text-amber-300 font-medium">Dynamic</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Base Rate:</span>
                      <span className="text-amber-300 font-medium">3.5×</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Peak Rate:</span>
                      <span className="text-amber-300 font-medium">5.0×</span>
                    </div>
                    <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                      <p className="text-xs text-slate-400 text-center">
                        Loot rates automatically adjust based on server population and AI analysis
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Restart Schedule Card */}
              <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-400/20 backdrop-blur-sm">
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-4">
                    <div className="text-lg sm:text-xl font-bold text-cyan-300 mb-2">
                      Daily Restarts
                    </div>
                    <h4 className="text-lg font-semibold text-slate-200 mb-2">
                      Automated Schedule
                    </h4>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 font-medium">Morning Restart</span>
                        <span className="text-cyan-300 font-bold text-lg">4:00 AM</span>
                      </div>
                      <div className="text-xs text-slate-400">EST • Maintenance & Updates</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 font-medium">Afternoon Restart</span>
                        <span className="text-cyan-300 font-bold text-lg">3:00 PM</span>
                      </div>
                      <div className="text-xs text-slate-400">EST • Performance Optimization</div>
                    </div>
                    <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                      <p className="text-xs text-slate-400 text-center">
                        Programmed restarts ensure optimal server performance
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Vehicle System Card */}
              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/20 backdrop-blur-sm">
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-4">
                    <div className="text-3xl sm:text-4xl font-bold text-green-300 mb-2">
                      75+
                    </div>
                    <h4 className="text-lg font-semibold text-slate-200 mb-2">
                      Wild Vehicles
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Condition:</span>
                      <span className="text-green-300 font-medium">No Engine</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Location:</span>
                      <span className="text-green-300 font-medium">Spawn Points</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Acquisition:</span>
                      <span className="text-green-300 font-medium">Salvage & Repair</span>
                    </div>
                    <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                      <p className="text-xs text-slate-400 text-center mb-2">
                        <Car className="h-4 w-4 inline mr-1" />
                        Retrieve abandoned vehicles and bring them to mechanics for refurbishment
                      </p>
                      <p className="text-xs text-slate-400 text-center">
                        Complete mechanic quests to earn fully restored vehicles as rewards
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Additional Settings Summary */}
            <div className="mt-8">
              <Card className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 border-slate-600/40 backdrop-blur-sm">
                <div className="p-6 sm:p-8">
                  <div className="text-center">
                    <h4 className="text-lg sm:text-xl font-semibold text-slate-200 mb-4">
                      Server Features
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-emerald-300 font-semibold">AI-Driven</div>
                        <div className="text-slate-400">Loot Balance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-blue-300 font-semibold">Automated</div>
                        <div className="text-slate-400">Maintenance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-purple-300 font-semibold">24/7</div>
                        <div className="text-slate-400">Monitoring</div>
                      </div>
                      <div className="text-center">
                        <div className="text-orange-300 font-semibold">Zero</div>
                        <div className="text-slate-400">Downtime</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-xl mt-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6">
          <div className="text-center">
            <p className="text-slate-500 text-sm">
              Built with ❤️ for the SCUM community • 
                by Bruno Portela
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
