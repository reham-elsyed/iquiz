import LoginButton from "@/components/Buttons/LoginButton/LoginButton";
import Rocket from "@/components/SVGComponents/Rocket";
import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GithubIcon } from "@/components/SVGComponents/GitHubIcon"
import { GoogleIcon } from "@/components/SVGComponents/GoogleIcon";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Suspense } from "react";
import { TextAtom } from "@/components/TextAtom";
import initTranslations from "@/app/i18n";
import { cookies } from "next/headers";
import i18nConfig from "@/i18n/i18nConfig";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/home");
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get(i18nConfig.localeCookie)?.value || i18nConfig.defaultLocale;
  const { t } = await initTranslations(locale, ['auth']);
  return (
    <div className="flex flex-col gap-y-4 items-center p-5 rounded-2xl w-full">
      <div className="flex flex-col justify-start items-start w-full pb-4 app-card-content h-full">
        <div className="space-y-4 ">

          <div className="flex items-center gap-x-2">
            <TextAtom textVariantComponent="h1" className="text-3xl font-bold tracking-tight leading-tight text-foreground">
              auth:login.welcomeBack
            </TextAtom>
            <Suspense fallback={<span>🚀</span>}>
              <Rocket size={22} />
            </Suspense></div>

          <TextAtom textVariantComponent="p" className="text-base text-muted-foreground leading-relaxed ">
            auth:login.subtitle
          </TextAtom>


          <TypingAnimation
            words={[t("login.typingAnimation.createTest"), t("login.typingAnimation.takeTest"), t("login.typingAnimation.evaluatePerformance")]}
            cursorStyle="underscore"
            loop
            className="text-3xl font-semibold text-primary"

          />

          <div className="pt-6">
            <TextAtom textVariantComponent="h2" className="text-2xl font-semibold text-foreground">
              auth:login.title
            </TextAtom>
          </div>
        </div>

        <div className="flex flex-col w-full justify-center items-start gap-y-5 mt-6">

          <LoginButton text={t('login.continueWithGithub')} callbackUrl="/home" icon={<GithubIcon />} />
          <LoginButton text={t('login.continueWithGoogle')} callbackUrl="/home" icon={<GoogleIcon />} />
        </div>
      </div>
    </div>
  );
}
