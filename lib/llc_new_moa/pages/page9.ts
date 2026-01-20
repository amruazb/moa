import { LLCNewMOAContext, pageFooter } from '../types'

export function page9(ctx: LLCNewMOAContext, pageNum: number = 9): string {
  const { company } = ctx

  return `
    <div class="page">
      <div class="page-content">
      
      <!-- Article 7 continued -->
      <div class="article-pair">
        <div class="block">
          <p>(c) to act as an agent for the companies, establishments, international organizations and other legal entities in relation to the Company's objectives and to represent the same in the UAE and abroad;</p>
          <p>(d) to enter into commercial and financial transactions, execute and implement contracts and other obligations, draw, accept and negotiate negotiable instruments, open and operate bank accounts and borrow money for any period of time with or without security on any or all of the assets of the Company, issue guarantees for itself and third parties, invest monies and deal with such investments on its own account and generally to institute, participate in or promote commercial and mercantile enterprises and activities in relation to or for the purpose of the business of the Company, and to do all such other things as may be considered to be incidental to or conducive to the above objects or any of them;</p>
          <p>(e) to purchase, lease, or otherwise acquire, hold, develop, improve, manage, operate, sell, convey, transfer, or otherwise dispose of real and personal property of every kind and description;</p>
          <p>(f) to engage in any lawful act or activity for which companies may be organized under the applicable laws and regulations of the UAE.</p>
          <p><strong>7-3</strong> The Company may carry out any other activities related to or connected with the above mentioned objects after obtaining the necessary licenses and approvals from the competent authorities.</p>
          <p><strong>7-4</strong> The Company shall not engage in any activities that are prohibited by the laws and regulations of the UAE or that require special licenses without obtaining such licenses from the competent authorities.</p>
        </div>
        <div class="block rtl">
          <p>(ج) العمل كوكيل للشركات والمؤسسات والمنظمات الدولية والكيانات القانونية الأخرى فيما يتعلق بأهداف الشركة وتمثيلها في دولة الإمارات العربية المتحدة وخارجها؛</p>
          <p>(د) الدخول في معاملات تجارية ومالية، وتنفيذ العقود والالتزامات الأخرى، وسحب وقبول والتفاوض على الأوراق التجارية القابلة للتداول، وفتح وتشغيل حسابات مصرفية واقتراض الأموال لأي فترة زمنية مع أو بدون ضمان على أي أو جميع أصول الشركة، وإصدار ضمانات لنفسها وللأطراف الثالثة، واستثمار الأموال والتعامل مع هذه الاستثمارات لحسابها الخاص وبشكل عام إنشاء أو المشاركة في أو تعزيز المشاريع والأنشطة التجارية فيما يتعلق بأو لغرض أعمال الشركة، والقيام بجميع الأمور الأخرى التي قد تعتبر عرضية أو مؤدية إلى الأهداف المذكورة أعلاه أو أي منها؛</p>
          <p>(هـ) شراء أو استئجار أو الحصول بأي طريقة أخرى على الممتلكات العقارية والشخصية من كل نوع ووصف، والاحتفاظ بها وتطويرها وتحسينها وإدارتها وتشغيلها وبيعها ونقلها أو التصرف فيها بأي طريقة أخرى؛</p>
          <p>(و) الانخراط في أي عمل أو نشاط قانوني يمكن تنظيم الشركات من أجله بموجب القوانين واللوائح المعمول بها في دولة الإمارات العربية المتحدة.</p>
          <p><strong>7-3</strong> يجوز للشركة القيام بأي أنشطة أخرى ذات صلة أو مرتبطة بالأهداف المذكورة أعلاه بعد الحصول على التراخيص والموافقات اللازمة من السلطات المختصة.</p>
          <p><strong>7-4</strong> لا يجوز للشركة الانخراط في أي أنشطة محظورة بموجب قوانين ولوائح دولة الإمارات العربية المتحدة أو التي تتطلب تراخيص خاصة دون الحصول على هذه التراخيص من السلطات المختصة.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}

