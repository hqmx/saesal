const { chromium } = require('playwright');
const fs = require('fs').promises;

async function analyzeLinearHomepage() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport for consistent analysis
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  console.log('Navigating to Linear homepage...');
  await page.goto('https://linear.app', { 
    waitUntil: 'domcontentloaded',
    timeout: 60000 
  });
  
  // Wait for main content to load
  await page.waitForTimeout(5000);
  
  const uxPatterns = {
    metadata: {
      url: 'https://linear.app/homepage',
      analyzedAt: new Date().toISOString(),
      viewport: { width: 1920, height: 1080 }
    },
    navigation: {},
    hero: {},
    typography: {},
    buttons: [],
    animations: [],
    layout: {},
    forms: [],
    images: [],
    features: [],
    testimonials: [],
    footer: {},
    colorScheme: {},
    interactions: []
  };

  // Analyze Navigation
  console.log('Analyzing navigation...');
  uxPatterns.navigation = await page.evaluate(() => {
    const nav = document.querySelector('nav') || document.querySelector('header');
    if (!nav) return null;
    
    const links = Array.from(nav.querySelectorAll('a')).map(link => ({
      text: link.textContent.trim(),
      href: link.href,
      isButton: link.classList.toString().includes('button') || 
                getComputedStyle(link).backgroundColor !== 'rgba(0, 0, 0, 0)'
    }));
    
    return {
      type: (getComputedStyle(nav).position === 'sticky' || 
             getComputedStyle(nav).position === 'fixed') ? 'sticky' : 'static',
      items: links,
      hasLogo: !!nav.querySelector('img[alt*="logo" i], svg'),
      hasMobileMenu: !!nav.querySelector('[aria-label*="menu" i]'),
      backgroundColor: getComputedStyle(nav).backgroundColor
    };
  });

  // Analyze Hero Section
  console.log('Analyzing hero section...');
  uxPatterns.hero = await page.evaluate(() => {
    const hero = document.querySelector('main > section:first-child, [class*="hero" i]');
    if (!hero) return null;
    
    const heading = hero.querySelector('h1');
    const subheading = hero.querySelector('h2, p');
    const cta = hero.querySelector('button, a[class*="button" i]');
    
    return {
      hasHeading: !!heading,
      headingText: heading?.textContent.trim(),
      hasSubheading: !!subheading,
      subheadingText: subheading?.textContent.trim(),
      hasCTA: !!cta,
      ctaText: cta?.textContent.trim(),
      hasVideo: !!hero.querySelector('video'),
      hasImage: !!hero.querySelector('img'),
      layout: hero.style.display || getComputedStyle(hero).display,
      minHeight: getComputedStyle(hero).minHeight
    };
  });

  // Analyze Typography
  console.log('Analyzing typography...');
  uxPatterns.typography = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const body = document.body;
    
    return {
      headingFont: h1 ? getComputedStyle(h1).fontFamily : null,
      bodyFont: getComputedStyle(body).fontFamily,
      headingSize: h1 ? getComputedStyle(h1).fontSize : null,
      bodySize: getComputedStyle(body).fontSize,
      lineHeight: getComputedStyle(body).lineHeight,
      headingWeight: h1 ? getComputedStyle(h1).fontWeight : null
    };
  });

  // Analyze Buttons
  console.log('Analyzing buttons...');
  uxPatterns.buttons = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button, a[class*="button" i], [role="button"]'));
    return buttons.slice(0, 10).map(btn => ({
      text: btn.textContent.trim(),
      type: btn.tagName.toLowerCase(),
      classes: btn.className,
      backgroundColor: getComputedStyle(btn).backgroundColor,
      color: getComputedStyle(btn).color,
      borderRadius: getComputedStyle(btn).borderRadius,
      padding: getComputedStyle(btn).padding,
      hasIcon: !!btn.querySelector('svg, img, [class*="icon" i]'),
      hasShadow: getComputedStyle(btn).boxShadow !== 'none'
    }));
  });

  // Analyze Animations
  console.log('Analyzing animations...');
  uxPatterns.animations = await page.evaluate(() => {
    const animatedElements = Array.from(document.querySelectorAll('*')).filter(el => {
      const styles = getComputedStyle(el);
      return styles.animation !== 'none' || 
             styles.transition !== 'all 0s ease 0s' ||
             el.classList.toString().match(/animate|fade|slide|bounce/i);
    });
    
    return animatedElements.slice(0, 10).map(el => ({
      tagName: el.tagName.toLowerCase(),
      classes: el.className,
      animation: getComputedStyle(el).animation,
      transition: getComputedStyle(el).transition,
      transform: getComputedStyle(el).transform
    }));
  });

  // Analyze Layout
  console.log('Analyzing layout...');
  uxPatterns.layout = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    const sections = Array.from(main.querySelectorAll('section'));
    
    return {
      containerType: getComputedStyle(main).maxWidth ? 'contained' : 'full-width',
      maxWidth: getComputedStyle(main).maxWidth,
      gridUsage: Array.from(document.querySelectorAll('*')).some(el => 
        getComputedStyle(el).display === 'grid'),
      flexUsage: Array.from(document.querySelectorAll('*')).some(el => 
        getComputedStyle(el).display === 'flex'),
      sectionCount: sections.length,
      hasAsymmetricLayout: sections.some(s => {
        const children = s.children;
        return children.length > 1 && 
               Array.from(children).some(c => getComputedStyle(c).width !== '100%');
      })
    };
  });

  // Analyze Forms
  console.log('Analyzing forms...');
  uxPatterns.forms = await page.evaluate(() => {
    const forms = Array.from(document.querySelectorAll('form'));
    return forms.map(form => ({
      action: form.action,
      method: form.method,
      fields: Array.from(form.querySelectorAll('input, textarea, select')).map(field => ({
        type: field.type || field.tagName.toLowerCase(),
        name: field.name,
        placeholder: field.placeholder,
        required: field.required
      })),
      hasSubmitButton: !!form.querySelector('button[type="submit"], input[type="submit"]')
    }));
  });

  // Analyze Images
  console.log('Analyzing images...');
  uxPatterns.images = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img')).slice(0, 10);
    return images.map(img => ({
      src: img.src,
      alt: img.alt,
      loading: img.loading,
      width: img.width,
      height: img.height,
      isResponsive: img.srcset ? true : false,
      borderRadius: getComputedStyle(img).borderRadius
    }));
  });

  // Analyze Feature Sections
  console.log('Analyzing feature sections...');
  uxPatterns.features = await page.evaluate(() => {
    const featureSections = Array.from(document.querySelectorAll('[class*="feature" i], [class*="benefit" i]'));
    return featureSections.slice(0, 5).map(section => ({
      heading: section.querySelector('h2, h3')?.textContent.trim(),
      description: section.querySelector('p')?.textContent.trim(),
      hasIcon: !!section.querySelector('svg, [class*="icon" i]'),
      hasImage: !!section.querySelector('img'),
      layout: getComputedStyle(section).display,
      backgroundColor: getComputedStyle(section).backgroundColor
    }));
  });

  // Analyze Color Scheme
  console.log('Analyzing color scheme...');
  uxPatterns.colorScheme = await page.evaluate(() => {
    const body = document.body;
    const isDark = getComputedStyle(body).backgroundColor.includes('0, 0, 0') ||
                   body.classList.toString().includes('dark');
    
    // Get primary colors from buttons and links
    const primaryButton = document.querySelector('button, a[class*="primary" i]');
    const link = document.querySelector('a');
    
    return {
      mode: isDark ? 'dark' : 'light',
      backgroundColor: getComputedStyle(body).backgroundColor,
      textColor: getComputedStyle(body).color,
      primaryColor: primaryButton ? getComputedStyle(primaryButton).backgroundColor : null,
      linkColor: link ? getComputedStyle(link).color : null,
      hasGradients: Array.from(document.querySelectorAll('*')).some(el => 
        getComputedStyle(el).background.includes('gradient'))
    };
  });

  // Analyze Interactions
  console.log('Analyzing interactions...');
  uxPatterns.interactions = await page.evaluate(() => {
    const interactiveElements = Array.from(document.querySelectorAll(
      'button, a, input, [onclick], [role="button"], [tabindex]'
    ));
    
    return {
      totalInteractiveElements: interactiveElements.length,
      hasDropdowns: !!document.querySelector('select, [role="combobox"], [aria-haspopup]'),
      hasModals: !!document.querySelector('[role="dialog"], [class*="modal" i]'),
      hasTooltips: !!document.querySelector('[role="tooltip"], [class*="tooltip" i]'),
      hasTabs: !!document.querySelector('[role="tablist"], [class*="tab" i]'),
      hasAccordion: !!document.querySelector('[class*="accordion" i], [class*="collapse" i]'),
      hasCarousel: !!document.querySelector('[class*="carousel" i], [class*="slider" i]'),
      hasSearch: !!document.querySelector('input[type="search"], [role="search"]'),
      hasVideoPlayer: !!document.querySelector('video, iframe[src*="youtube"], iframe[src*="vimeo"]')
    };
  });

  // Analyze Footer
  console.log('Analyzing footer...');
  uxPatterns.footer = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return null;
    
    const links = Array.from(footer.querySelectorAll('a'));
    const sections = Array.from(footer.querySelectorAll('section, div > ul'));
    
    return {
      exists: true,
      linkCount: links.length,
      sectionCount: sections.length,
      hasSocialLinks: links.some(link => 
        link.href.includes('twitter') || 
        link.href.includes('linkedin') || 
        link.href.includes('github')),
      hasCopyright: footer.textContent.includes('©'),
      hasNewsletter: !!footer.querySelector('form, input[type="email"]'),
      backgroundColor: getComputedStyle(footer).backgroundColor
    };
  });

  await browser.close();
  return uxPatterns;
}

// Main execution
(async () => {
  try {
    console.log('Starting Linear homepage UX analysis...');
    const uxData = await analyzeLinearHomepage();
    
    // Save to JSON file
    const jsonOutput = JSON.stringify(uxData, null, 2);
    await fs.writeFile('linear-homepage-ux.json', jsonOutput);
    
    console.log('\n✅ Analysis complete! Results saved to linear-homepage-ux.json');
    console.log('\nSummary:');
    console.log(`- Navigation items: ${uxData.navigation?.items?.length || 0}`);
    console.log(`- Buttons found: ${uxData.buttons.length}`);
    console.log(`- Animations detected: ${uxData.animations.length}`);
    console.log(`- Form elements: ${uxData.forms.length}`);
    console.log(`- Color scheme: ${uxData.colorScheme.mode}`);
    console.log(`- Interactive elements: ${uxData.interactions.totalInteractiveElements}`);
    
  } catch (error) {
    console.error('Error during analysis:', error);
  }
})();
