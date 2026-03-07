import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, MessageSquare, PenTool, Image as ImageIcon, Video, CheckCircle, Mail, Phone, X, Play, ChevronDown } from 'lucide-react';

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

// 案例数据结构
type VideoItem = {
  id: string;
  title: string;
  videoUrl?: string;
  bilibiliId?: string;
};

type PortfolioCategory = {
  id: string;
  title: string;
  desc: string;
  coverVideo: string;
  videos: VideoItem[];
};

const PORTFOLIO_DATA: PortfolioCategory[] = [
  {
    id: 'brand-story',
    title: "品牌故事",
    desc: "塑造品牌灵魂，传递核心价值",
    coverVideo: "https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/%E5%9C%B0%E4%BA%A7%E6%A6%82%E5%BF%B5%E7%89%87.mp4",
    videos: [
      { id: 'b1', title: '华为 × 青岛开业创意', videoUrl: 'https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/%E5%8D%8E%E4%B8%BA%20%C3%97%20%E9%9D%92%E5%B2%9B%E5%BC%80%E4%B8%9A%E5%88%9B%E6%84%8F.mp4' },
      { id: 'b2', title: '华为 × 合肥开业创意', videoUrl: 'https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/%E5%8D%8E%E4%B8%BA%20%C3%97%20%E5%90%88%E8%82%A5%E5%BC%80%E4%B8%9A%E5%88%9B%E6%84%8F.mp4' },
      { id: 'b3', title: '华为 × 潍坊开业创意', videoUrl: 'https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/%E5%8D%8E%E4%B8%BA%20%C3%97%20%E6%BD%8D%E5%9D%8A%E5%BC%80%E4%B8%9A%E5%88%9B%E6%84%8F.mp4' },
      { id: 'b4', title: 'KFC品牌概念片', videoUrl: 'https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/KFC%E5%93%81%E7%89%8C%E6%A6%82%E5%BF%B5%E7%89%87.mp4' },
      { id: 'b5', title: 'SEIN品牌概念片', videoUrl: 'https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/SEIN%E5%93%81%E7%89%8C%E6%A6%82%E5%BF%B5%E7%89%87.mp4' },
      { id: 'b6', title: '可口可乐产品概念片', videoUrl: 'https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/%E5%8F%AF%E5%8F%A3%E5%8F%AF%E4%B9%90%E4%BA%A7%E5%93%81%E6%A6%82%E5%BF%B5%E7%89%87.mp4' },
      { id: 'b7', title: '地产概念片', videoUrl: 'https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/%E5%9C%B0%E4%BA%A7%E6%A6%82%E5%BF%B5%E7%89%87.mp4' },
    ]
  },
  {
    id: 'product-showcase',
    title: "产品展示",
    desc: "概念化呈现，突出产品特性",
    coverVideo: "https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/%E8%B5%AB%E8%8E%B2%E5%A8%9C%E7%BE%8E%E5%A6%86%E4%BA%A7%E5%93%81%E6%A6%82%E5%BF%B5%E7%89%87.mp4",
    videos: [
      { id: 'p1', title: '赫莲娜美妆产品概念片', videoUrl: 'https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/%E8%B5%AB%E8%8E%B2%E5%A8%9C%E7%BE%8E%E5%A6%86%E4%BA%A7%E5%93%81%E6%A6%82%E5%BF%B5%E7%89%87.mp4' },
      { id: 'p2', title: 'ARMANI美妆产品概念片', videoUrl: 'https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/ARMANI%E7%BE%8E%E5%A6%86%E4%BA%A7%E5%93%81%E6%A6%82%E5%BF%B5%E7%89%87.mp4' },
      { id: 'p3', title: 'GUERLAIN美妆产品概念片', videoUrl: 'https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/GUERLAIN%E7%BE%8E%E5%A6%86%E4%BA%A7%E5%93%81%E6%A6%82%E5%BF%B5%E7%89%87.mp4' },
      { id: 'p4', title: '韩束产品概念片', videoUrl: 'https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/%E9%9F%A9%E6%9D%9F%E4%BA%A7%E5%93%81%E6%A6%82%E5%BF%B5%E7%89%87.mp4' },
      { id: 'p5', title: 'KANS韩束产品概念片', videoUrl: 'https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/KANS%E9%9F%A9%E6%9D%9F%E4%BA%A7%E5%93%81%E6%A6%82%E5%BF%B5%E7%89%87.mp4' },
      { id: 'p6', title: 'AMX安慕希', videoUrl: 'https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/AMX%E5%AE%89%E6%85%95%E5%B8%8C.mp4' },
      { id: 'p7', title: '2026新春季', videoUrl: 'https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/2026%E6%96%B0%E6%98%A5%E5%AD%A3.mp4' },
      { id: 'p8', title: '新颜开局，请站C位', videoUrl: 'https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/%E6%96%B0%E9%A2%9C%E5%BC%80%E5%B1%80%EF%BC%8C%E8%AF%B7%E7%AB%99C%E4%BD%8D.mp4' },
    ]
  },
  {
    id: 'city-promo',
    title: "城市宣传片",
    desc: "展现城市魅力，打造文旅名片",
    coverVideo: "https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/%E4%B8%AD%E5%9B%BD%C2%B7%E9%9D%92%E5%B2%9B%E5%9F%8E%E5%B8%82%E6%A6%82%E5%BF%B5%E7%89%87.mp4",
    videos: [
      { id: 'c1', title: '中国·北京新年宣传片', bilibiliId: 'BV1WDAfzPE8k' },
      { id: 'c2', title: '中国·济南城市概念片', bilibiliId: 'BV1sDAfzPEp7' },
      { id: 'c3', title: '中国·聊城新春概念片', bilibiliId: 'BV1sDAfzPEsJ' },
      { id: 'c4', title: '中国·青岛城市概念片', videoUrl: 'https://alestudio.oss-cn-hangzhou.aliyuncs.com/READMD/%E4%B8%AD%E5%9B%BD%C2%B7%E9%9D%92%E5%B2%9B%E5%9F%8E%E5%B8%82%E6%A6%82%E5%BF%B5%E7%89%87.mp4' },
    ]
  }
];

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // 控制当前选中的案例分类
  const [activeCategory, setActiveCategory] = useState<typeof PORTFOLIO_DATA[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 锁定背景滚动
  useEffect(() => {
    if (activeCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-black text-zinc-50 font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">Ale Studios</div>
          <a href="#contact" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            联系我们
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black" />
          <img 
            src="https://picsum.photos/seed/abstract-dark/1920/1080?blur=10" 
            alt="Background" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4">
              一切皆有可能
              <span className="block text-xl md:text-3xl text-zinc-500 mt-3 font-light tracking-[0.2em] uppercase">Everything is Possible</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              一家位于中国青岛的高端AI概念片与宣传片定制工作室。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a 
                href="#workflow"
                className="px-8 py-4 bg-white text-black rounded-full font-medium text-sm hover:bg-zinc-200 transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
              >
                探索流程 <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#contact"
                className="px-8 py-4 bg-white/10 text-white rounded-full font-medium text-sm hover:bg-white/20 transition-colors w-full sm:w-auto backdrop-blur-md"
              >
                获取报价
              </a>
            </div>

            <div className="flex justify-center">
              <a 
                href="#portfolio"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Play className="w-3 h-3 group-hover:text-blue-400 transition-colors" fill="currentColor" />
                </div>
                <span>直达案例展示厅，见证视觉奇迹</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.a
          href="#workflow"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-zinc-500 hover:text-white transition-colors z-20"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase mb-2">Scroll</span>
          <ChevronDown className="w-5 h-5 opacity-50" />
        </motion.a>
      </section>

      {/* Value Proposition */}
      <section className="py-12 px-6 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {[
              { title: "全类目定制", desc: "打破行业限制，满足任何场景的高端视觉需求。", icon: Sparkles },
              { title: "独创情绪板", desc: "让您在正式制作前，提前看到精确的视觉效果。", icon: ImageIcon },
              { title: "100% 满意度", desc: "提供三次免费修改机会，确保最终成品完美契合期望。", icon: CheckCircle }
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-900 transition-colors">
                  <feature.icon className="w-5 h-5 text-blue-400 mb-3" />
                  <h3 className="text-base font-medium mb-1">{feature.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-16 px-6 bg-gradient-to-b from-zinc-950 via-indigo-950/20 to-zinc-950 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/grid/1920/1080?blur=10')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">从创意到成品，<br/>每一步都精确可见。</h2>
              <p className="text-zinc-400 text-base">五步核心工作流，确保交付品质</p>
            </div>
          </FadeIn>

          <div className="relative space-y-12">
            {/* 贯穿五步的中心连接线 */}
            <div className="absolute left-1/2 top-4 bottom-4 w-px bg-white/10 -translate-x-1/2 z-0 hidden md:block" />

            {/* Step 1 */}
            <FadeIn>
              <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div className="flex-1 md:text-right">
                  <div className="text-blue-500 font-mono text-xs mb-2">STEP 01</div>
                  <h3 className="text-xl font-medium mb-3">需求沟通与素材收集</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">深度了解您的需求、想法和创意概念。收集实拍素材，明确视频目标、受众和传播渠道，确定核心理念与风格方向。</p>
                </div>
                <div className="hidden md:block w-12 h-12 shrink-0"></div>
                <div className="hidden md:block md:flex-1"></div>
              </div>
            </FadeIn>

            {/* Step 2 */}
            <FadeIn>
              <div className="flex flex-col md:flex-row-reverse gap-8 items-center relative z-10">
                <div className="flex-1">
                  <div className="text-blue-500 font-mono text-xs mb-2">STEP 02</div>
                  <h3 className="text-xl font-medium mb-3">文字脚本与分镜生成</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">基于需求创作专业文字脚本，制作详细分镜描述。确认故事线索和叙事结构，待您审核确认后进入视觉化阶段。</p>
                </div>
                <div className="hidden md:block w-12 h-12 shrink-0"></div>
                <div className="hidden md:block md:flex-1"></div>
              </div>
            </FadeIn>

            {/* Step 3 - Highlighted */}
            <FadeIn>
              <div className="relative p-1 rounded-3xl bg-gradient-to-b from-blue-500/30 to-transparent z-10">
                <div className="bg-black rounded-[23px] p-6 md:p-8 border border-white/5">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium mb-4 border border-blue-500/20">
                        <Sparkles className="w-3 h-3" /> 核心创新环节
                      </div>
                      <div className="text-blue-500 font-mono text-xs mb-2">STEP 03</div>
                      <h3 className="text-2xl font-semibold mb-3">情绪板制作 (Moodboard)</h3>
                      <ul className="space-y-2 text-zinc-400 text-sm">
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          <span>完整的脚本分镜展示，确定整体视觉基调和情绪氛围。</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          <span className="text-white font-medium">关键帧成片效果图：每个分镜都提供用AI提前生成的“预视”效果。</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          <span>让您在正式制作前，100%了解最终风格效果。</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="aspect-video rounded-2xl overflow-hidden relative border border-white/10 bg-zinc-900 group">
                        <img 
                          src="/moodboard.jpg" 
                          alt="华为青岛生活馆情绪板" 
                          className="w-full h-full object-cover object-top hover:object-bottom opacity-80 group-hover:opacity-100 transition-all duration-[8s] ease-in-out"
                          onError={(e) => {
                            e.currentTarget.src = "https://picsum.photos/seed/moodboard/800/800?blur=2";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 pointer-events-none">
                          <span className="text-sm font-medium text-white mb-1">华为 x 青岛生活馆</span>
                          <span className="text-xs text-zinc-400">真实情绪板案例预览 (悬停查看全貌)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Step 4 */}
            <FadeIn>
              <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div className="flex-1 md:text-right">
                  <div className="text-blue-500 font-mono text-xs mb-2">STEP 04</div>
                  <h3 className="text-xl font-medium mb-3">AI 成片制作</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">基于确认的情绪板进行全流程制作。利用最先进的AI技术生成视频，整合实拍素材，并完成专业剪辑、调色、配音与配乐。</p>
                </div>
                <div className="hidden md:block w-12 h-12 shrink-0"></div>
                <div className="hidden md:block md:flex-1"></div>
              </div>
            </FadeIn>

            {/* Step 5 */}
            <FadeIn>
              <div className="flex flex-col md:flex-row-reverse gap-8 items-center relative z-10">
                <div className="flex-1">
                  <div className="text-blue-500 font-mono text-xs mb-2">STEP 05</div>
                  <h3 className="text-xl font-medium mb-3">三次免费修改</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">我们提供免费三次修改机会，认真听取您的每次反馈。确保最终成品完全满足期望，高质量交付，建立长期合作关系。</p>
                </div>
                <div className="hidden md:block w-12 h-12 shrink-0"></div>
                <div className="hidden md:block md:flex-1"></div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-12 text-center">案例展示厅</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.map((item, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div 
                  className="group cursor-pointer"
                  onClick={() => setActiveCategory(item)}
                >
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-900 relative mb-4">
                    <video 
                      src={item.coverVideo} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      autoPlay loop muted playsInline webkit-playsinline="true"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 scale-90 group-hover:scale-100 transition-transform duration-500">
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 p-6 pointer-events-none">
                      <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                      <p className="text-zinc-400 text-xs">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* About & Contact */}
      <section id="contact" className="py-20 px-6 bg-zinc-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeIn>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight mb-6">关于我们</h2>
                <p className="text-zinc-400 leading-relaxed mb-8">
                  Ale Studios 是一支小而精的专注团队。我们相信技术是表达创意的画笔，而情感是作品的灵魂。通过最前沿的AI技术，我们致力于为客户提供超越想象的视觉体验。
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-zinc-300">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">微信咨询</div>
                      <div className="font-medium">185 8238 7919</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-zinc-300">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">商务邮箱</div>
                      <div className="font-medium text-sm">alestudio88888@gmail.com<br/>2785102210@qq.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-zinc-900/50 rounded-3xl p-8 border border-white/5">
                <h3 className="text-xl font-medium mb-6">开启您的定制之旅</h3>
                {submitSuccess ? (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-green-500 mb-2">需求已成功发送！</h4>
                    <p className="text-sm text-zinc-400">我们的商务团队将在24小时内与您联系，请保持通讯畅通。</p>
                  </div>
                ) : (
                  <form 
                    className="space-y-4" 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSubmitting(true);
                      
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);
                      
                      try {
                        const response = await fetch('https://formspree.io/f/mjgenegl', {
                          method: 'POST',
                          body: formData,
                          headers: {
                            'Accept': 'application/json'
                          }
                        });
                        
                        if (response.ok) {
                          setSubmitSuccess(true);
                          form.reset();
                          setTimeout(() => setSubmitSuccess(false), 5000);
                        } else {
                          alert('发送失败，请稍后重试或直接联系我们的邮箱。');
                        }
                      } catch (error) {
                        alert('网络错误，请稍后重试。');
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
                    <div>
                      <input 
                        type="text" 
                        name="Name"
                        placeholder="您的称呼" 
                        required
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  <div>
                    <input 
                      type="text" 
                      name="Contact"
                      placeholder="联系方式 (微信/电话)" 
                      required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <select 
                      name="VideoType"
                      required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none text-zinc-400 focus:text-white invalid:text-zinc-500"
                      defaultValue=""
                    >
                      <option value="" disabled>选择视频类型</option>
                      <option value="企业宣传片">企业宣传片</option>
                      <option value="品牌宣传片">品牌宣传片</option>
                      <option value="产品展示片">产品展示片</option>
                      <option value="城市宣传片">城市宣传片</option>
                      <option value="概念短片">概念短片</option>
                      <option value="其他">其他</option>
                    </select>
                  </div>
                  <div>
                    <select 
                      name="Duration"
                      required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none text-zinc-400 focus:text-white invalid:text-zinc-500"
                      defaultValue=""
                    >
                      <option value="" disabled>选择成片时长</option>
                      <option value="15秒以内">15秒以内</option>
                      <option value="15-30秒">15-30秒</option>
                      <option value="30-60秒">30-60秒</option>
                      <option value="1-2分钟">1-2分钟</option>
                      <option value="2-3分钟">2-3分钟</option>
                    </select>
                  </div>
                  <div>
                    <select 
                      name="Budget"
                      required
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none text-zinc-400 focus:text-white invalid:text-zinc-500"
                      defaultValue=""
                    >
                      <option value="" disabled>选择项目预算</option>
                      <option value="1,000-3,000">1,000 - 3,000</option>
                      <option value="3,000-5,000">3,000 - 5,000</option>
                      <option value="5,000-10,000">5,000 - 10,000</option>
                      <option value="10,000-20,000">10,000 - 20,000</option>
                    </select>
                    <p className="text-xs text-zinc-500 mt-2 px-1">
                      * 成片效果与AI大模型、渲染精度、后期精细度均按预算分级匹配
                    </p>
                  </div>
                  <div>
                    <textarea 
                      name="Requirement"
                      placeholder="简单描述您的需求细节..." 
                      rows={3}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-white text-black font-medium rounded-xl px-4 py-3 text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        发送中...
                      </>
                    ) : (
                      '发送需求'
                    )}
                  </button>
                </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-zinc-600 text-sm border-t border-white/5 bg-black">
        <p>© {new Date().getFullYear()} Ale Studios. All rights reserved.</p>
        <p className="mt-2 text-xs">中国 · 青岛</p>
      </footer>

      {/* Category Modal / Sub-page */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-black overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{activeCategory.title}</h2>
                <p className="text-xs text-zinc-400">{activeCategory.desc}</p>
              </div>
              <button 
                onClick={() => setActiveCategory(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content - Video Grid */}
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCategory.videos.map((video, idx) => (
                  <motion.div 
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="bg-zinc-900/50 rounded-3xl overflow-hidden border border-white/5"
                  >
                    <div className="aspect-video bg-black relative">
                      {video.bilibiliId ? (
                        <iframe 
                          src={`https://player.bilibili.com/player.html?bvid=${video.bilibiliId}&page=1&high_quality=1&danmaku=0`}
                          scrolling="no" 
                          border="0" 
                          frameBorder="no" 
                          framespacing="0" 
                          allowFullScreen={true}
                          className="w-full h-full absolute inset-0"
                        ></iframe>
                      ) : (
                        <video 
                          src={video.videoUrl} 
                          className="w-full h-full object-cover"
                          controls
                          playsInline
                          webkit-playsinline="true"
                          preload="metadata"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium">{video.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {activeCategory.videos.length === 0 && (
                <div className="text-center py-24 text-zinc-500">
                  <Video className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>更多精彩案例正在整理中...</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
