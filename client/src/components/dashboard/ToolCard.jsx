import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const ToolCard = ({ title, description, icon, creditCost, route, disabled = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!disabled) {
      navigate(route);
    }
  };

  return (
    <div className={`card-hover ${disabled ? 'opacity-60' : ''}`} onClick={!disabled ? handleClick : undefined}>
      <div className="flex flex-col h-full">
        <div className="text-6xl mb-6">{icon}</div>
        <h3 className="text-2xl font-semibold font-display text-dark-text mb-3">{title}</h3>
        <p className="text-dark-muted text-sm mb-6 flex-grow leading-relaxed">{description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-dark-border">
          <div className="flex items-center">
            <span className="text-yellow-400 mr-2 text-xl">⭐</span>
            <span className="font-semibold text-accent-400 text-lg">{creditCost}</span>
            <span className="text-dark-muted text-sm ml-1">credits</span>
          </div>
          
          <Button
            variant={disabled ? "secondary" : "primary"}
            size="sm"
            onClick={handleClick}
            disabled={disabled}
          >
            {disabled ? 'Not Enough Credits' : 'Use Tool →'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;


