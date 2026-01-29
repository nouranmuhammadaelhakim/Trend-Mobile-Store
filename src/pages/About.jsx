import React from 'react';
import SectionTitle from '../components/SectionTitle';

const About = () => {
    return (
        <div className="container section-padding">
            <SectionTitle title="ABOUT US" subtitle="Get to know Trend Store" />
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.8' }}>
                    Trend Store is your premier destination for high-quality mobile accessories.
                    Founded with a passion for technology and style, we aim to provide the best products
                    for your devices. From protective cases to high-seed chargers, we have it all.
                </p>
            </div>
        </div>
    );
};

export default About;
