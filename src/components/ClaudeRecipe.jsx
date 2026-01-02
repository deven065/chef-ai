import ReactMarkdown from "react-markdown";

// Icon components
function ClockIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ChefHatIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
      <line x1="6" y1="17" x2="18" y2="17" />
    </svg>
  );
}

export default function Recipe({ recipe }) {
  if (!recipe) {
    return null;
  }

  // Helper function to clean markdown syntax
  const cleanMarkdown = (text) => {
    return text
      .replace(/\*\*/g, '') // Remove bold markers
      .replace(/\*/g, '')   // Remove italic markers
      .replace(/__/g, '')   // Remove bold underscores
      .replace(/_/g, '')    // Remove italic underscores
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
      .replace(/`/g, '')    // Remove code markers
      .trim();
  };

  // Parse markdown to extract recipe components
  const lines = recipe.split('\n');
  let title = 'Your Recipe';
  let description = '';
  let cookTime = '30 mins';
  let servings = '4';
  let difficulty = 'Medium';
  const ingredients = [];
  const instructions = [];
  
  let currentSection = '';
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    const lowerLine = trimmedLine.toLowerCase();
    
    // Extract title (first heading)
    if (trimmedLine.startsWith('# ') && !title.includes(':')) {
      title = cleanMarkdown(trimmedLine.substring(2));
    }
    // Extract description (text after title, before sections)
    else if (trimmedLine && !trimmedLine.startsWith('#') && !trimmedLine.startsWith('**') && 
             !trimmedLine.startsWith('-') && !trimmedLine.match(/^\d+\./) && 
             index < 5 && !currentSection) {
      description += (description ? ' ' : '') + cleanMarkdown(trimmedLine);
    }
    // Detect sections
    else if (lowerLine.includes('ingredient')) {
      currentSection = 'ingredients';
    }
    else if (lowerLine.includes('instruction') || lowerLine.includes('direction')) {
      currentSection = 'instructions';
    }
    // Extract ingredients (lines starting with - or *)
    else if (currentSection === 'ingredients' && (trimmedLine.startsWith('-') || trimmedLine.startsWith('*'))) {
      ingredients.push(cleanMarkdown(trimmedLine.substring(1)));
    }
    // Extract instructions (numbered lines)
    else if (currentSection === 'instructions' && trimmedLine.match(/^\d+\./)) {
      instructions.push(cleanMarkdown(trimmedLine.replace(/^\d+\.\s*/, '')));
    }
    
    // Enhanced metadata extraction
    // Extract cooking/prep time
    if (lowerLine.includes('time') || lowerLine.includes('prep') || lowerLine.includes('cook')) {
      // Look for patterns like "30 minutes", "1 hour", "45 mins", "1.5 hours", "1 hr 30 min"
      const timeMatch = trimmedLine.match(/(\d+(?:\.\d+)?)\s*(hour|hr|minute|min|h|m)/gi);
      if (timeMatch) {
        cookTime = cleanMarkdown(timeMatch.join(' ').replace(/\s+/g, ' '));
      } else {
        // Try to extract after colon
        const colonSplit = trimmedLine.split(':');
        if (colonSplit.length > 1) {
          const timeStr = colonSplit[1].trim();
          if (timeStr && timeStr.match(/\d/)) {
            cookTime = cleanMarkdown(timeStr);
          }
        }
      }
    }
    
    // Extract servings - enhanced pattern matching
    if (lowerLine.includes('serving') || lowerLine.includes('yield') || lowerLine.includes('makes') || 
        lowerLine.includes('serves') || lowerLine.includes('portion') || lowerLine.includes('people')) {
      // Look for various patterns
      // Pattern 1: "Serves: 4" or "Servings: 4-6"
      const colonMatch = trimmedLine.match(/(?:serving|serve|yield|makes|portion)s?:\s*(\d+)(?:\s*-\s*(\d+))?/i);
      if (colonMatch) {
        servings = colonMatch[2] ? `${colonMatch[1]}-${colonMatch[2]}` : colonMatch[1];
      } else {
        // Pattern 2: "Makes 4 servings" or "Serves 6 people"
        const makeMatch = trimmedLine.match(/(?:makes|serves|yields?)\s+(\d+)(?:\s*-\s*(\d+))?/i);
        if (makeMatch) {
          servings = makeMatch[2] ? `${makeMatch[1]}-${makeMatch[2]}` : makeMatch[1];
        } else {
          // Pattern 3: Just a number with serving word nearby
          const numMatch = trimmedLine.match(/(\d+)(?:\s*-\s*(\d+))?\s*(?:serving|portion|people|person)/i);
          if (numMatch) {
            servings = numMatch[2] ? `${numMatch[1]}-${numMatch[2]}` : numMatch[1];
          } else {
            // Pattern 4: Number anywhere in line with serving word
            const anyMatch = trimmedLine.match(/\d+/);
            if (anyMatch) {
              servings = anyMatch[0];
            }
          }
        }
      }
    }
    
    // Extract difficulty
    if (lowerLine.includes('difficulty') || lowerLine.includes('level')) {
      if (lowerLine.includes('easy') || lowerLine.includes('beginner') || lowerLine.includes('simple')) {
        difficulty = 'Easy';
      } else if (lowerLine.includes('hard') || lowerLine.includes('advanced') || lowerLine.includes('difficult')) {
        difficulty = 'Hard';
      } else if (lowerLine.includes('medium') || lowerLine.includes('intermediate') || lowerLine.includes('moderate')) {
        difficulty = 'Medium';
      }
    }
  });

  // If parsing didn't work well, show markdown
  if (ingredients.length === 0 && instructions.length === 0) {
    return (
      <section className="recipe-card" aria-live="polite">
        <div className="recipe-header">
          <h2>AI Chef Recommends:</h2>
        </div>
        <div className="recipe-content">
          <ReactMarkdown>{recipe}</ReactMarkdown>
        </div>
      </section>
    );
  }

  return (
    <section className="recipe-card" aria-live="polite">
      {/* Header */}
      <div className="recipe-header">
        <h2>{title}</h2>
        {description && <p className="recipe-description">{description}</p>}
      </div>

      {/* Meta Info */}
      <div className="recipe-meta">
        <div className="meta-item">
          <ClockIcon />
          <div>
            <div className="meta-label">Time</div>
            <div className="meta-value">{cookTime}</div>
          </div>
        </div>
        <div className="meta-item">
          <UsersIcon />
          <div>
            <div className="meta-label">Servings</div>
            <div className="meta-value">{servings}</div>
          </div>
        </div>
        <div className="meta-item">
          <ChefHatIcon />
          <div>
            <div className="meta-label">Level</div>
            <div className="meta-value">{difficulty}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="recipe-content">
        {/* Ingredients */}
        {ingredients.length > 0 && (
          <div className="recipe-section">
            <h3 className="section-title">
              Ingredients
            </h3>
            <ul className="ingredients-list-recipe">
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  <span className="bullet-point" />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Instructions */}
        {instructions.length > 0 && (
          <div className="recipe-section">
            <h3 className="section-title">
              Instructions
            </h3>
            <ol className="instructions-list">
              {instructions.map((instruction, index) => (
                <li key={index}>
                  <span className="step-number">{index + 1}</span>
                  <span className="step-text">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
