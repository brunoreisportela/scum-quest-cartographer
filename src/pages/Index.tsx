import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Server, MessageCircle, Copy, ExternalLink, FileText, Download, Map, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '@/components/LanguageToggle';
import LauncherModal from '@/components/LauncherModal';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                  {t('header.title')}
                </div>
              </div>
              <div className="text-sm sm:text-lg lg:text-xl font-bold text-slate-200"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:block text-xs sm:text-sm text-slate-400 font-medium">
                {t('header.tagline')}
              </div>
              <LanguageToggle />
              <LauncherModal>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/10 font-semibold"
                >
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{t('header.launcher')}</span>
                  <span className="sm:hidden">{t('header.launcherShort')}</span>
                </Button>
              </LauncherModal>
            </div>
          </div>
        </div>
      </header>

      {/* Server Information Section */}
      <section className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-2">
              {t('serverInfo.title')}
            </h3>
            <p className="text-slate-400 text-sm sm:text-base">
              {t('serverInfo.subtitle')}
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
                  <h4 className="text-lg font-semibold text-slate-200">{t('serverInfo.serverIp')}</h4>
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
                  {t('serverInfo.copyServerIp')}
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
                  <h4 className="text-lg font-semibold text-slate-200">{t('serverInfo.discord')}</h4>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  {t('serverInfo.discordDescription')}
                </p>
                <Button
                  onClick={() => window.open('https://discord.gg/7xY9s6HH7J', '_blank')}
                  variant="outline"
                  size="sm"
                  className="w-full border-blue-400/50 text-blue-300 hover:bg-blue-500/10"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t('serverInfo.joinDiscord')}
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
                  <h4 className="text-lg font-semibold text-slate-200">{t('serverInfo.serverRules')}</h4>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  {t('serverInfo.serverRulesDescription')}
                </p>
                <Button
                  onClick={() => navigate('/server-rules')}
                  variant="outline"
                  size="sm"
                  className="w-full border-purple-400/50 text-purple-300 hover:bg-purple-500/10"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {t('serverInfo.viewRules')}
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
                  <h4 className="text-lg font-semibold text-slate-200">{t('serverInfo.questCartographer')}</h4>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  {t('serverInfo.questCartographerDescription')}
                </p>
                <Button
                  onClick={() => navigate('/quest-cartographer')}
                  variant="outline"
                  size="sm"
                  className="w-full border-teal-400/50 text-teal-300 hover:bg-teal-500/10"
                >
                  <Map className="h-4 w-4 mr-2" />
                  {t('serverInfo.viewQuests')}
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
                {t('serverSpecs.title')}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base">
                {t('serverSpecs.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {/* CPU Card */}
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-400/20 backdrop-blur-sm">
                <div className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-300 mb-1">48</div>
                    <div className="text-xs sm:text-sm text-blue-200 font-medium mb-2">{t('serverSpecs.cores')}</div>
                    <div className="text-slate-300 text-sm font-medium">Intel Xeon Gold</div>
                  </div>
                </div>
              </Card>

              {/* RAM Card */}
              <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-400/20 backdrop-blur-sm">
                <div className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-300 mb-1">500</div>
                    <div className="text-xs sm:text-sm text-emerald-200 font-medium mb-2">{t('serverSpecs.ram')}</div>
                    <div className="text-slate-300 text-sm font-medium">{t('serverSpecs.errorCorrecting')}</div>
                  </div>
                </div>
              </Card>

              {/* GPU Card */}
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/20 backdrop-blur-sm">
                <div className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-300 mb-1">16×</div>
                    <div className="text-xs sm:text-sm text-purple-200 font-medium mb-2">{t('serverSpecs.teslaA100')}</div>
                    <div className="text-slate-300 text-sm font-medium">{t('serverSpecs.aiTasks')}</div>
                  </div>
                </div>
              </Card>

              {/* Storage Card */}
              <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-400/20 backdrop-blur-sm">
                <div className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-orange-300 mb-1">12</div>
                    <div className="text-xs sm:text-sm text-orange-200 font-medium mb-2">{t('serverSpecs.nvme')}</div>
                    <div className="text-slate-300 text-sm font-medium">{t('serverSpecs.raid0')}</div>
                  </div>
                </div>
              </Card>

              {/* Tick Rate Card */}
              <Card className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-400/20 backdrop-blur-sm">
                <div className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-yellow-300 mb-1">10 ↔ 30</div>
                    <div className="text-xs sm:text-sm text-yellow-200 font-medium mb-2">{t('serverSpecs.tps')}</div>
                    <div className="text-slate-300 text-sm font-medium">{t('serverSpecs.adaptive')}</div>
                  </div>
                </div>
              </Card>

              {/* Players Card */}
              <Card className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border-indigo-400/20 backdrop-blur-sm">
                <div className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-indigo-300 mb-1">50</div>
                    <div className="text-xs sm:text-sm text-indigo-200 font-medium mb-2">{t('serverSpecs.players')}</div>
                    <div className="text-slate-300 text-sm font-medium">{t('serverSpecs.capacity')}</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Performance Summary */}
            <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50 backdrop-blur-sm">
              <div className="p-6 sm:p-8">
                <div className="text-center">
                  <h4 className="text-lg sm:text-xl font-semibold text-slate-200 mb-3">
                    {t('serverSpecs.performanceGuarantee')}
                  </h4>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {t('serverSpecs.performanceDescription')}
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
                {t('serverConfig.title')}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base">
                {t('serverConfig.subtitle')}
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
                      {t('serverConfig.variableLootMultiplier')}
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{t('serverConfig.aiControlled')}:</span>
                      <span className="text-amber-300 font-medium">{t('serverConfig.dynamic')}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{t('serverConfig.baseRate')}:</span>
                      <span className="text-amber-300 font-medium">3.5×</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{t('serverConfig.peakRate')}:</span>
                      <span className="text-amber-300 font-medium">5.0×</span>
                    </div>
                    <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                      <p className="text-xs text-slate-400 text-center">
                        {t('serverConfig.lootDescription')}
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
                      {t('serverConfig.dailyRestarts')}
                    </div>
                    <h4 className="text-lg font-semibold text-slate-200 mb-2">
                      {t('serverConfig.automatedSchedule')}
                    </h4>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 font-medium">{t('serverConfig.morningRestart')}</span>
                        <span className="text-cyan-300 font-bold text-lg">4:00 AM</span>
                      </div>
                      <div className="text-xs text-slate-400">{t('serverConfig.maintenanceUpdates')}</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 font-medium">{t('serverConfig.afternoonRestart')}</span>
                        <span className="text-cyan-300 font-bold text-lg">3:00 PM</span>
                      </div>
                      <div className="text-xs text-slate-400">{t('serverConfig.performanceOptimization')}</div>
                    </div>
                    <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                      <p className="text-xs text-slate-400 text-center">
                        {t('serverConfig.restartDescription')}
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
                      {t('serverConfig.wildVehicles')}
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{t('serverConfig.condition')}:</span>
                      <span className="text-green-300 font-medium">{t('serverConfig.noEngine')}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{t('serverConfig.location')}:</span>
                      <span className="text-green-300 font-medium">{t('serverConfig.spawnPoints')}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{t('serverConfig.acquisition')}:</span>
                      <span className="text-green-300 font-medium">{t('serverConfig.salvageRepair')}</span>
                    </div>
                    <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                      <p className="text-xs text-slate-400 text-center mb-2">
                        <Car className="h-4 w-4 inline mr-1" />
                        {t('serverConfig.vehicleDescription1')}
                      </p>
                      <p className="text-xs text-slate-400 text-center">
                        {t('serverConfig.vehicleDescription2')}
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
                      {t('serverConfig.serverFeatures')}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-emerald-300 font-semibold">{t('serverConfig.aiDriven')}</div>
                        <div className="text-slate-400">{t('serverConfig.lootBalance')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-blue-300 font-semibold">{t('serverConfig.automated')}</div>
                        <div className="text-slate-400">{t('serverConfig.maintenance')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-purple-300 font-semibold">24/7</div>
                        <div className="text-slate-400">{t('serverConfig.monitoring')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-orange-300 font-semibold">{t('serverConfig.zero')}</div>
                        <div className="text-slate-400">{t('serverConfig.downtime')}</div>
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
              {t('footer.builtWith')}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
