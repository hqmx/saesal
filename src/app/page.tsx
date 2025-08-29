'use client';

import React from 'react';
import Demo2Navigation from '@/components/demo2/Demo2Navigation';
import Demo2HeroSection from '@/components/demo2/Demo2HeroSection';
import Demo2AboutSection from '@/components/demo2/Demo2AboutSection';
import Demo2ComparisonSection from '@/components/demo2/Demo2ComparisonSection';
import Demo2ProcessSection from '@/components/demo2/Demo2ProcessSection';
import Demo2SafetySection from '@/components/demo2/Demo2SafetySection';
import Demo2ContactSection from '@/components/demo2/Demo2ContactSection';
import { useActiveSection } from '@/hooks/useActiveSection';

const demo2Config = {
  "theme": {
    "colors": {
      "primary": "#2563EB",
      "secondary": "#10B981",
      "accent": "#F59E0B", 
      "background": "#F8FAFC",
      "surface": "#FFFFFF",
      "text": {
        "primary": "#1F2937",
        "secondary": "#6B7280",
        "muted": "#9CA3AF"
      }
    },
    "typography": {
      "fontFamily": {
        "primary": "Inter, system-ui, sans-serif",
        "heading": "Inter, system-ui, sans-serif"
      },
      "fontSize": {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem"
      }
    }
  },
  "layout": {
    "header": {
      "height": 80,
      "background": "rgba(255, 255, 255, 0.95)",
      "backdropBlur": true,
      "shadow": true
    },
    "container": {
      "maxWidth": "1200px",
      "padding": {
        "mobile": "1rem",
        "tablet": "2rem", 
        "desktop": "3rem"
      }
    }
  },
  "components": {
    "hero": {
      "title": "Do Tattoo On Tattoo",
      "subtitle": "Ink will Remove",
      "description": "Solution of Remove Ink off your Skin",
      "cta": {
        "primary": "Learn More",
        "secondary": "Contact Us"
      }
    },
    "about": {
      "title": "What is 'Saesal'?",
      "subtitle": "Perfect and Effective way to Remove Tattoo ink of skin",
      "description": "'Saesal' Solve Every Limitation of Laser Treatment",
      "meaning": {
        "title": "Meaning of 'Saesal'",
        "description": "It Means \"New Skin\" in Korean leading to new life with new skin. create a bigger and brighter future."
      }
    },
    "comparison": {
      "title": "Laser vs Saesal Treatment",
      "laser": {
        "title": "Limitations of Laser Treatment",
        "issues": [
          {
            "title": "Color Limitation",
            "description": "Laser only works on dark colors. Warm and bright (Red, Yellow, Green) color removal is big limitation."
          },
          {
            "title": "Painful Process", 
            "description": "Technically Laser treatment is burning skin which is most painful issue of humans body. Also it causes burn scars."
          },
          {
            "title": "Long Process",
            "description": "It takes more then 10 sessions to completely remove tattoo. If it's color tattoo, it takes more sessions."
          },
          {
            "title": "Difficult Aftercare",
            "description": "Laser treatment left blister. It's needs more difficult aftercare."
          }
        ]
      },
      "saesal": {
        "title": "What about 'Saesal'?",
        "benefits": [
          {
            "title": "All Colors",
            "description": "'Saesal' works every single colors. Also it works on Cosmetic Tattoo."
          },
          {
            "title": "Safe Process",
            "description": "It's not Laser Removal. 'Saesal' Treatment is same as Tattooing."
          },
          {
            "title": "Fast Results",
            "description": "'Saesal' Treatment only takes 4 sessions to completely remove inks."
          },
          {
            "title": "Easy Aftercare", 
            "description": "'Saesal' treatment only left scabs, like tattoo. And aftercare is also like tattoo."
          }
        ]
      }
    },
    "process": {
      "title": "How 'Saesal' Works",
      "subtitle": "Natural Healing Process",
      "steps": [
        {
          "title": "Treatment Application",
          "description": "Saesal solution treatment works same as tattooing"
        },
        {
          "title": "Natural Scab Formation", 
          "description": "Saesal solution helps Natural healing system make scab with ink"
        },
        {
          "title": "Ink Removal",
          "description": "About 2 weeks later, ink is actually move out of body with scab"
        },
        {
          "title": "Healing Process",
          "description": "Right after scabs fall off, skin looks pink. It's normal natural healing process. About 10-12 weeks later, Skin gets ready to another session."
        }
      ],
      "medical": {
        "title": "Medical Comparison",
        "laser": {
          "title": "Laser Treatment",
          "description": "Laser treatment break ink particle smaller. White blood cell moves ink particles through the vein to kidney"
        },
        "saesal": {
          "title": "Saesal Treatment", 
          "description": "Tattoo ink is stays big particle under the skin. Saesal removes ink particles with natural scab formation"
        }
      }
    },
    "safety": {
      "title": "Solution is Safe?",
      "answer": "Yes!",
      "description": "It's all Natural and Organic Material also those are part of the Components of Human's Body."
    },
    "contact": {
      "title": "Work with us!",
      "subtitle": "We are always open",
      "form": {
        "title": "지원하시겠습니까?",
        "fields": [
          {
            "name": "name",
            "label": "Name",
            "type": "text",
            "required": true
          },
          {
            "name": "phone", 
            "label": "Phone",
            "type": "tel",
            "required": true
          },
          {
            "name": "email",
            "label": "E-mail",
            "type": "email", 
            "required": true
          },
          {
            "name": "position",
            "label": "Position",
            "type": "select",
            "options": [
              "(선택)",
              "Interior Designer", 
              "Data Engineer",
              "Product Designer"
            ]
          },
          {
            "name": "resume",
            "label": "Resume",
            "type": "file"
          },
          {
            "name": "portfolio",
            "label": "Portfolio", 
            "type": "file"
          }
        ]
      }
    }
  }
};

export default function Home() {
  const activeSection = useActiveSection();

  return (
    <div style={{ 
      fontFamily: demo2Config.theme.typography.fontFamily.primary,
      backgroundColor: demo2Config.theme.colors.background,
      color: demo2Config.theme.colors.text.primary
    }}>
      <Demo2Navigation activeSection={activeSection} config={demo2Config} />
      <main>
        <Demo2HeroSection config={demo2Config} />
        <Demo2AboutSection config={demo2Config} />
        <Demo2ComparisonSection config={demo2Config} />
        <Demo2ProcessSection config={demo2Config} />
        <Demo2SafetySection config={demo2Config} />
        <Demo2ContactSection config={demo2Config} />
      </main>
    </div>
  );
}