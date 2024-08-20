import { useState } from "react";
import "./accordion.css"

function Accordion() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="accordion">
      <button onClick={() => setOpen(!isOpen)}>
        {isOpen ? "Hide Information" : "Show Information"}
      </button>

      {isOpen && (
        <div>
          <p><strong>English:</strong></p>
          <p>
            Our Mission: The mission of our ELL Bot is to lend a helping hand to
            refugees in need of understanding the culture and environment of the
            US. Our team hopes to drive positive change and empower refugees to
            rebuild their lives in the US by helping them through language and
            cultural barriers.
          </p>
          <p><strong>Spanish:</strong></p>
          <p>
            Nuestra misión: La misión de nuestro ELL Bot es ayudar a los refugiados
            que necesitan comprender la cultura y el medio ambiente de los EE. UU.
            Nuestro equipo espera impulsar un cambio positivo y empoderar a los
            refugiados para que reconstruyan sus vidas en los EE. UU. ayudándolos a
            superar las barreras lingüísticas y culturales.
          </p>
          <p><strong>Ukrainian:</strong></p>
          <p>
            Наша місія: Місія нашого ELL Bot полягає в тому, щоб простягнути руку
            допомоги біженцям, які потребують розуміння культури та середовища США.
            Наша команда сподівається сприяти позитивним змінам і дати біженцям
            можливість відновити своє життя в США, допомагаючи їм подолати мовні та
            культурні бар’єри.
          </p>
          <p><strong>Russian:</strong></p>
          <p>
            Наша миссия: Миссия нашего бота ELL — протянуть руку помощи беженцам,
            нуждающимся в понимании культуры и окружающей среды США. Наша команда
            надеется добиться позитивных изменений и дать беженцам возможность
            восстановить свою жизнь в США, помогая им преодолеть языковые и
            культурные барьеры.
          </p>
          <p><strong>Arabic:</strong></p>
          <p>
            مھمتنا: تتمثل مھمة ELL Bot لدینا في تقدیم ید العون للاجئین المحتاجین إلى
            فھم ثقافة وبیئة الولایات المتحدة. ویأمل فریقنا في إحداث تغییر إیجابي
            وتمكین اللاجئین من إعادة بناء حیاتھم في الولایات المتحدة من خلال
            مساعدتھم في التغلب على الحواجز اللغویة والثقافیة.
          </p>
          <p><strong>English:</strong> Languages we Support: Spanish, Ukrainian, Russian, and Arabic.</p>
          <p><strong>Spanish:</strong> Idiomas que admitimos: español, ucraniano, ruso y árabe.</p>
          <p><strong>Ukrainian:</strong> Мови, які ми підтримуємо: іспанська, українська, російська та арабська.</p>
          <p><strong>Russian:</strong> Языки, которые мы поддерживаем: испанский, украинский, русский и арабский.</p>
        </div>
      )}
    </div>
  );
}

export default Accordion;
