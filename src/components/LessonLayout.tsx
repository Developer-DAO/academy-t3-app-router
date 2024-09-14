import CreatedBy from "@/components/CreatedBy";

interface LessonLayoutProps {
  children: React.ReactNode;
  lessonTitle: string;
  lessonImage?: string;
  lessonDescription?: string;
  author: string;
  authorImage: string;
  authorPosition: string;
  authorTwitter: string;
  createdDate: string;
}

export default function LessonLayout({
  children,
  lessonTitle,
  lessonImage = "default-meta-image.png",
  lessonDescription = "Start your journey to become a Web3 Developer today. Free high-quality courses to learn web3 with Developer DAO Academy.",
  author,
  authorImage,
  authorTwitter,
}: LessonLayoutProps) {
  return (
    <main className="px-10 pt-36 text-white lg:mx-auto lg:max-w-screen-lg lg:pt-44">
      <section className="text-center">
        <h1 className="font-future text-3xl lg:text-6xl">{lessonTitle}</h1>
      </section>
      <CreatedBy
        author={author}
        authorImage={authorImage}
        authorTwitter={authorTwitter}
      />
      <div className="pt-4 font-poppins text-xl font-medium tracking-wider lg:mx-auto lg:max-w-screen-lg">
        {children}
      </div>
    </main>
  );
}
