import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, Info, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LauncherModalProps {
  children: React.ReactNode;
}

const LauncherModal: React.FC<LauncherModalProps> = ({ children }) => {
  const { t } = useTranslation();

  const handleDownload = () => {
    window.open('/sentience_launcher.exe', '_blank');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-200 flex items-center gap-2">
            <Download className="h-5 w-5 text-emerald-400" />
            {t('launcherModal.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Instructions */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <div className="text-slate-300">
                <strong className="text-emerald-300">{t('launcherModal.step1')}</strong>
                <p className="text-slate-400 text-sm mt-1">{t('launcherModal.step1Desc')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <div className="text-slate-300">
                <strong className="text-emerald-300">{t('launcherModal.step2')}</strong>
                <p className="text-slate-400 text-sm mt-1">{t('launcherModal.step2Desc')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
              <div className="text-slate-300">
                <strong className="text-emerald-300">{t('launcherModal.step3')}</strong>
                <p className="text-slate-400 text-sm mt-1">{t('launcherModal.step3Desc')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
              <div className="text-slate-300">
                <strong className="text-emerald-300">{t('launcherModal.step4')}</strong>
                <p className="text-slate-400 text-sm mt-1">{t('launcherModal.step4Desc')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">5</div>
              <div className="text-slate-300">
                <strong className="text-emerald-300">{t('launcherModal.step5')}</strong>
                <p className="text-slate-400 text-sm mt-1">{t('launcherModal.step5Desc')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">6</div>
              <div className="text-slate-300">
                <strong className="text-emerald-300">{t('launcherModal.step6')}</strong>
                <p className="text-slate-400 text-sm mt-1">{t('launcherModal.step6Desc')}</p>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-slate-300">
                <h4 className="font-semibold text-blue-300 mb-2">{t('launcherModal.noteTitle')}</h4>
                <p className="text-sm text-slate-400 mb-2">{t('launcherModal.note1')}</p>
                <p className="text-sm text-slate-400">{t('launcherModal.note2')}</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="text-slate-300">
                <h4 className="font-semibold text-emerald-300 mb-2">{t('launcherModal.additionalTitle')}</h4>
                <p className="text-sm text-slate-400">{t('launcherModal.additionalInfo')}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleDownload}
              className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400 text-emerald-300"
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              {t('launcherModal.downloadButton')}
            </Button>
            <Button
              onClick={() => window.open('https://discord.gg/7xY9s6HH7J', '_blank')}
              className="bg-blue-500/20 hover:bg-blue-500/30 border-blue-400 text-blue-300"
              variant="outline"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {t('launcherModal.discordButton')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LauncherModal;
