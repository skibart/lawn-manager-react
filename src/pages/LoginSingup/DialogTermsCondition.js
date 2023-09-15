import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

export function DialogTermsCondition() {
  const { i18n } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'login' });

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <a
        onClick={handleOpen}
        className="font-medium transition-colors hover:text-gray-900"
      >
        &nbsp;{t('terms')}
      </a>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{t('terms')}</DialogHeader>
        {i18n.resolvedLanguage === 'pl' && (
          <DialogBody divider className="h-[40rem] overflow-scroll">
            <Typography className="font-normal text-lg">
              <span className="text-xl font-semibold">
                §1 Postanowienia ogólne
              </span>
              Niniejszy regulamin określa zasady korzystania z internetowej
              aplikacji do notatek o nawożeniu trawnika (dalej zwanej
              "Aplikacją"). Aplikacja jest dostępna pod adresem{' '}
              <a
                href="https://lawnmanager.maihom.ovh"
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                lawnmanager.maihom.ovh
              </a>
              . Korzystając z Aplikacji, Użytkownik akceptuje warunki zawarte w
              tym regulaminie.
            </Typography>
            <Typography className="font-normal text-lg mt-6">
              <span className="text-xl font-semibold">
                §2 Odpowiedzialność za dane
              </span>
              Administrator nie ponosi odpowiedzialności za utratę, uszkodzenie
              lub nieautoryzowany dostęp do danych przechowywanych w Aplikacji.
            </Typography>
            <Typography className="font-normal text-lg mt-6">
              <span className="text-xl font-semibold">
                §3 Przetwarzanie danych
              </span>
              Dane przekazywane do Aplikacji, takie jak notatki o nawożeniu
              trawnika, mogą być przetwarzane przez Administratora w celu
              tworzenia statystyk, analiz, oraz w celach związanych z
              funkcjonowaniem Aplikacji. Dane zbierane w Aplikacji nie będą
              udostępniane osobom trzecim, w szczególności nie będą ujawniane
              dane identyfikujące poszczególnych użytkowników, ich adresy e-mail
              ani inne szczegółowe dane osobowe.
            </Typography>
            <Typography className="font-normal text-lg mt-6">
              <span className="text-xl font-semibold">
                §4 Zmiany w regulaminie
              </span>
              Administrator zastrzega sobie prawo do zmiany niniejszego
              regulaminu w dowolnym czasie. Użytkownicy zostaną poinformowani o
              zmianach poprzez wiadomość umieszczoną w Aplikacji lub na stronie
              internetowej Aplikacji.
            </Typography>
            <Typography className="font-normal text-lg mt-6">
              <span className="text-xl font-semibold">
                §5 Postanowienia końcowe
              </span>
              Korzystanie z Aplikacji jest dobrowolne. Administrator zastrzega
              sobie prawo do zawieszenia lub zaprzestania świadczenia usług za
              pośrednictwem Aplikacji w każdym czasie, bez podania przyczyny.
              Niniejszy regulamin wchodzi w życie od dnia 01.09.2023 r. i
              obowiązuje dla wszystkich użytkowników Aplikacji. Wszelkie sprawy
              sporne wynikłe z korzystania z Aplikacji będą rozstrzygane na
              podstawie polskiego prawa i przez właściwe sądy. Prosimy o
              zapoznanie się z regulaminem przed korzystaniem z Aplikacji.
            </Typography>
          </DialogBody>
        )}
        {i18n.resolvedLanguage === 'en' && (
          <DialogBody divider className="h-[40rem] overflow-scroll">
            <Typography className="font-normal text-lg">
              <span className="text-xl font-semibold">
                §1 General Provisions
              </span>
              This regulation defines the rules for using the online application
              for notes on lawn fertilization (hereinafter referred to as the
              "Application"). The Application is available at the address{' '}
              <a
                href="https://lawnmanager.maihom.ovh"
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                lawnmanager.maihom.ovh
              </a>
              . By using the Application, the User accepts the terms contained
              in this regulation.
            </Typography>
            <Typography className="font-normal text-lg mt-6">
              <span className="text-xl font-semibold">
                §2 Data Responsibility
              </span>
              The Administrator is not responsible for the loss, damage, or
              unauthorized access to data stored in the Application.
            </Typography>
            <Typography className="font-normal text-lg mt-6">
              <span className="text-xl font-semibold">§3 Data Processing</span>
              Data transmitted to the Application, such as notes on lawn
              fertilization, may be processed by the Administrator for the
              purpose of creating statistics, analysis, and for purposes related
              to the functioning of the Application. Data collected in the
              Application will not be disclosed to third parties, and in
              particular, data identifying individual users, their email
              addresses, or other detailed personal information will not be
              disclosed.
            </Typography>
            <Typography className="font-normal text-lg mt-6">
              <span className="text-xl font-semibold">
                §4 Changes to the Regulation
              </span>
              The Administrator reserves the right to change this regulation at
              any time. Users will be informed of changes through a message
              placed in the Application or on the Application's website.
            </Typography>
            <Typography className="font-normal text-lg mt-6">
              <span className="text-xl font-semibold">§5 Final Provisions</span>
              The use of the Application is voluntary. The Administrator
              reserves the right to suspend or terminate the provision of
              services through the Application at any time, without stating a
              reason. This regulation comes into effect on September 1, 2023,
              and applies to all users of the Application. Any disputes arising
              from the use of the Application will be resolved under Polish law
              and by the competent courts. Please read the regulation before
              using the Application.
            </Typography>
          </DialogBody>
        )}

        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            {t('close')}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
