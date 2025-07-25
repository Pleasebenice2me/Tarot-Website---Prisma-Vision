const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];
  let numStars = Math.floor(window.innerWidth * window.innerHeight / 3000);
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      velocity: Math.random() * 0.5 + 0.2
    });
 }
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.velocity;

    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(animateStars);
}

const cardNames = [
  // Arcanes majeurs (0 à 21)
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
  "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
  "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
  "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
  "Judgement", "The World",

  // Arcanes mineurs - Chalices (Coupes)
  "Ace of Chalices", "Two of Chalices", "Three of Chalices", "Four of Chalices", "Five of Chalices",
  "Six of Chalices", "Seven of Chalices", "Eight of Chalices", "Nine of Chalices", "Ten of Chalices",
  "Page of Chalices", "Knight of Chalices", "Queen of Chalices", "King of Chalices",

  // Arcanes mineurs - Pentacles (Deniers)
  "Ace of Pentacles", "Two of Pentacles", "Three of Pentacles", "Four of Pentacles", "Five of Pentacles",
  "Six of Pentacles", "Seven of Pentacles", "Eight of Pentacles", "Nine of Pentacles", "Ten of Pentacles",
  "Page of Pentacles", "Knight of Pentacles", "Queen of Pentacles", "King of Pentacles",

  // Arcanes mineurs - Swords (Épées)
  "Ace of Swords", "Two of Swords", "Three of Swords", "Four of Swords", "Five of Swords",
  "Six of Swords", "Seven of Swords", "Eight of Swords", "Nine of Swords", "Ten of Swords",
  "Page of Swords", "Knight of Swords", "Queen of Swords", "King of Swords",

  // Arcanes mineurs - Wands (Bâtons)
  "Ace of Wands", "Two of Wands", "Three of Wands", "Four of Wands", "Five of Wands",
  "Six of Wands", "Seven of Wands", "Eight of Wands", "Nine of Wands", "Ten of Wands",
  "Page of Wands", "Knight of Wands", "Queen of Wands", "King of Wands"
];


const card = document.querySelector('.tarot-card');
const fadeOverlay = document.getElementById('fade-overlay');

function showFullDeck() {
  const deckGrid = document.getElementById('deck-grid');
  deckGrid.innerHTML = '';
  const totalCards = 78; // Total number of cards in the deck

  for (let i = 1; i <= totalCards; i++) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-item');

    const img = document.createElement('img');
    img.src = `images/card${i}.png`;
    img.addEventListener('click', () => {
      playCardSound();
      startMusic();
      openCardModal(i);
    });

    const label = document.createElement('div');
    label.textContent = cardNames[i - 1] || `Card ${i}`;

    cardContainer.appendChild(img);
    cardContainer.appendChild(label);
    deckGrid.appendChild(cardContainer);
  }
}

card.addEventListener('click', () => {
  playCardSound();
  startMusic();
  // Start zoom effect
  card.classList.add('zooming');

  // Start background fade to black immediately
  fadeOverlay.style.pointerEvents = 'auto';
  fadeOverlay.style.opacity = '1';

  // Wait for zoom and fade to finish (3s), then show the deck
  setTimeout(() => {
    document.querySelector('.container').style.display = 'none';
    fadeOverlay.style.opacity = '0'; // fade away after transition
    fadeOverlay.style.pointerEvents = 'none';

    document.getElementById('deck-container').style.display = 'block';
    showFullDeck();

    card.classList.remove('zooming');
  }, 3000); // Matches the 3s animation time
});



const cardModal = document.getElementById('card-modal');
const modalCardImage = document.getElementById('modal-card-image');
const btnUpright = document.getElementById('btn-upright');
const btnReversed = document.getElementById('btn-reversed');
const cardDescription = document.getElementById('card-description');
const cardFlipWrapper = document.querySelector('.card-flip-wrapper');


const cardMeanings = {
  "The Fool": {
    upright: {
      title: "New Beginning • Spontaneity • Leap of Faith",
      text: "The Fool represents a new beginning, striking out naively on a bold new adventure. You may be filled with unlimited optimism, a feeling in your heart that you cannot fail. This may prove misguided, and in due time you might find your idealism tempered by painful experience. So approach with caution: decide whether taking this risk is worth making yourself vulnerable in an unfamiliar setting. If the answer is yes, show no fear: only those who choose to journey will ever discover new horizons."
    },
    reversed: {
      title: "Recklessness • Fear of the Unknown • Naïveté",
      text: "When reversed, The Fool warns of rash decisions or a refusal to see potential risks. You may be ignoring your instincts, rushing ahead without preparation, or feeling paralyzed by fear of the unknown. It’s time to pause and reflect: are you truly ready for this journey, or are you merely escaping the present?"
    }
  },
  "The Magician": {
    upright: {
      title: "Bold • Self-determined • Skilled",
      text: "The Magician is bold with his decisive power. He is self-determined and self-confident, and possesses a vision he truly believes should be realized. He is passionate, creative, and above all deeply connected to his surroundings, to his vision, to his life. When you receive this card, expect to receive a bolt of energy: what you are doing is worthwhile, and you have the means within you to accomplish it. This is not a time for doubt, but for action."
    },
    reversed: {
      title: "Lack of Energy • Blockage • Time for Reflection",
      text: "When The Magician is reversed, it is not the time to exert your strength of will. Stoke it quietly within yourself, and store up your energy. Choosing inaction can be maddening and looks like a lack of momentum. But there is a fierce fortitude in self-discipline, resisting the urge to strike out. Bide your time and wait for the seeds to sprout before you come into your power."
    }
  },
  "The High Priestess": {
    upright: {
      title: "Introspective • Intuition • Mystery of Subconscious",
      text: "Counterbalancing the raw power of the Magician, the High Priestess is the internal, introspective side of creation. She is the fertile subconscious where ideas are first brought to life. Also consider that action is not always the best possible step: sometimes it’s best to reflect, amass strength, and consider your options before beginning anew. This is not an indication of cowardice, but of wisdom."
    },
    reversed: {
      title: "Disconnected • Secrets • Obscurity",
      text: "When you find the High Priestess walking upside down, you have lost access to your inner voice. There may be some cognitive dissonance obscuring the connection to your subconscious and spiritual mind. Dig deep. Where is she? What is she saying? Listen to that quiet, still voice. She has been observing, processing, assimilating, and she knows things you cannot yet acknowledge to yourself. The moon waxes; soon it will be full."
    }
  },
  "The Empress": {
    upright: {
      title: "Nurturing • Giving • Connection with Earth",
      text: "The Empress is a subtle ruler. Caught so often in the gray trivialities of our existence, we forget their inherent inauthenticity. The minutiae we build up around ourselves- our jobs, our status, our wealth: none of it is truly vital to our existence. All we need to survive is the bounty already provided to us by Mother Nature. Connect back to it. Revel in it. Take joy in the most basic pleasure: that of being alive."
    },
    reversed: {
      title: "Depletion • Exhaustion • Need for Self Care",
      text: "The Empress is a giver, generous with her time and resources. But even the most abundant benefactor has to get her reserves from somewhere, and sometimes those resources run low. If you feel depleted, nearing the point of exhaustion, right now it’s best to take care of yourself. Let other people nourish you for a change- you may be surprised at who rises to fill your place. Take a mindful step back."
    }
  },
  "The Emperor": {
    upright: {
      title: "Power • Focused Growth • Influential",
      text: "When you exude the Emperor’s energy, you might  naturally fall into  a position of power. Take care to use your increased influence for good. Try not to become superior to those around you but rather foster them in a way that allows for growth. By building others up, you improve the quality of life for your community as a whole."
    },
    reversed: {
      title: "Overly Controlling • Unstable • Lack of Authority",
      text: "What is your relationship with authority? Does it thwart you? Suppress you? Or have your structures been thrown into chaos, shifting beneath your feet? Whatever it is, a measured, systematic approach is difficult for you to achieve at the moment. Be flexible. Don’t cling so hard. A lack of good authority can be disorienting, but it’s also an opportunity to forge new boundaries and parameters that suit your most nascent needs. Enjoy this rare time of no rules and few limitations. See what sticks."
    }
  },
  "The Hierophant": {
    upright: {
      title: "Tradition • Spirituality • Education",
      text: "The Hierophant is like a constellation- imaginary lines drawn around the chaos of the cosmos that imbue the night sky with meaning. We take comfort knowing that our ancestors gazed up at the same stars, the same stories. But clinging too tightly to tradition can stave off the immutable law of nature’s changeability. When you receive this card, examine whether the energy of the Hierophant is guiding or merely thwarting you."
    },
    reversed: {
      title: "Change of Values • Poor Counsel • Difficulty Adjusting",
      text: "The Hierophant in its reversal points decidedly down, and his judgment feels final and absolute. Changing your relationship with that status quo can throw everything into disarray, your circumstances can make you feel intrinsically dysfunctional. But while some soul-searching may well be in order, it could be that something you’re involved in, an organization or company, just isn’t a good fit for you. That’s okay! Shake the dust off and move on. Something better is out there for you."
    }
  },
  "The Lovers": {
    upright: {
      title: "Partnership • Individualism • Blossoming Relationship ",
      text: "The Lovers suggest a potent time to begin a new relationship. Break down barriers. Let people get to know you, the real you, and welcome their energy into your life. Revel in sexuality and connection. Let yourself be influenced by one person. This is a card that celebrates individualism. Delight in integration without dimming your own beautiful gleam."
    },
    reversed: {
      title: "Disconnected • Imbalance in Relationship • Out of Sync",
      text: "Feeling out of sync with the ones you love is isolating, and sometimes downright terrifying. There’s a wide degree of disconnection: from petty bickering to a total breakdown of the bonds of love. If you wish to repair the relationship, a light touch is necessary right now. Stop looking for blame and restore intimacy through courtesy and com.passion. But when your spirit is hungry and your heart is unhappy more often than not, it may be time to end the dance and walk away."
    }
  },
  "The Chariot": {
    upright: {
      title: "Will Power • Self Assured • Confidence Moving Forward",
      text: "Being completely self-assured is a rare and glorious moment. If through careful preparation, self-discipline and steady determination you find your.self a victor, you have every right to be proud of your accomplishments. Direct this energy into further efforts; have total confidence in your abilities. You’ve clearly demonstrated to yourself and to the World what you can achieve. Forge on, refusing to let any obstacle stand in your way."
    },
    reversed: {
      title: "Losing Momentum • Self Doubt • Back Tracking",
      text: "You were on a roll! Now, unfortunately, your momentum has sputtered, your lights are flickering, and it feels like you’ve slammed on the brakes. Your chariot inverted, you’re climbing out of the wreckage, not even sure what went wrong. After you’ve assessed the damage, it may be time to cool your engine for a while. You cannot, and should not, feel driven every day. Be realistic and don’t force what doesn’t come naturally. Just let it ride."
    }
  },
  "Strength": {
    upright: {
      title: "Empowerment • Confidence • Vitality",
      text: "It’s easy to slink away from a tough situation, but it takes real strength to surmount one’s obstacles and press on. It is possible to be indomitable. By being resolute through difficult times and sustaining a strong, impenetrable core you can forge on indefinitely, constant.ly renewing your horizons. Do not be afraid. Fear is the mind-killer. You need only to believe yourself unconquerable for it to be so."
    },
    reversed: {
      title: "Lacking Courage • Passivity • Change of Approach ",
      text: "Strength can take many forms; it can be a subtle, supple thing. If your typical strengths aren’t working for you right now, it may be time to take a different approach. A gentler touch. What angles have you not explored yet? Is your ego preventing you from trying something new? Be humble. Listen to others. There is strength in holding back and not exerting your full will. Let others take the lead if your usual strategies are falling flat."
    }
  },
  "The Hermit": {
    upright: {
      title: "Searching Within • Solitude • Self Exploration",
      text: "Relationships with others are essential, but before we can communicate with others, we must be able to communicate with ourselves. When your thoughts are consistently muddled or diluted, take some time to uncloud your vision by gently removing yourself from society. Search within yourself for answers, and you may be surprised by what you find. Don’t worry about the sudden silence; it is merely expectant, waiting for you to speak."
    },
    reversed: {
      title: "Withdrawn • Lonely • Need for Connection",
      text: "Inverted, the Hermit hangs precariously on the bridge, as below him, the trees have knitted a lush, comfortable floor to catch his fall. When you receive his inversion in a reading, it’s time to shake things up. Leave the comfort of your daily trappings and reach out. You may be reaching the end of a long-deserved rest, or you may crave rest still yet out of reach. Put yourself out there and be open to the new connections that can form, there is no need to dwell in solitude for eternity."
    }
  },
  "Wheel of Fortune": {
    upright: {
      title: "Chance • Change • Destiny",
      text: "Constantly vying for power may seem like a futile pursuit, but it is in fact a simple, blessed characteristic of life that it is never at a standstill. The Wheel of Fortune shows the perpetual shifting in the balance of powers, manifested infinitely within every aspect of your life. At any given time, you will be the champion, be the contender, believe you are the champion, or have no reign at all, quickly hurtling yourself into the fray. This card suggests a change is coming. The old king is dead. Someone, or something, will rise up in its stead."
    },
    reversed: {
      title: "Misfortune • Bad Luck • Disappointment",
      text: "Change is inevitable, and sometimes things change in the way least wanted. It’s okay to halt your movement and just observe the status quo. Tread carefully and resist the impulse to leave it all behind. Whatever cycle you’re in isn’t over, and ending it prematurely will prevent your creative efforts from truly coming to fruition. If your current reality isn’t ideal, learn to live with the discomfort if you can. Chip away a little at a time, and see how you feel after some time has passed."
    }
  },
  "Justice": {
    upright: {
      title: "Cause and Effect • Balance • Accountability",
      text: "This card is a reminder that Justice is coming. You can only get away with unscrupulous behavior for so long. Eventually your motives will be found out, and there will be swift retribution to follow. But do not fear- being held accountable for your actions is how balance will be restored to the universe. It’s time to give back."
    },
    reversed: {
      title: "Bad Intentions • Blame • Imbalance",
      text: "Upright or inverted, the story remains the same: the snake bites the open hand and is promptly cut in twain for its misdeeds. What remains unclear is who is truly to blame. With our limited information, it is impossible to tell the intentions of the hand, and whether or not the snake lashed out in self-defense. When the facts remain elusive, it is best to stay the heavy hand of justice. Otherwise, you risk punishing the wrong person and letting a guilty party go free. If life has been unfair to you, retain your composure and stay sharp. Don’t lash out in useless, short-lived anger. Bide your time."
    }
  },
  "The Hanged Man": {
    upright: {
      title: "Going with the Flow • Surrendering Control • Letting Go",
      text: "Society would have you believe the idea that active mastery of your environment leads to greater fulfillment. No doubt in many ways this is true. But when life has transgressed beyond your control, through your own doing or the random unhappiness of fate, sometimes the best thing you can do is to surrender. Choose not to react. Rather, focus on the lucidity gained of suffering. Forsake action for insight so you may live to fight another day."
    },
    reversed: {
      title: "Amassing Strength • Change of Perspective • Self Trust",
      text: "When the Hanged Man is inverted, he appears to be falling out of the ocean, tipped face first into the night sky. The piranhas’ latent malice transmutes into fear. Like the inverted Hermit, this almost certainly portends a shake up, but instead of reaching out to others, it is time to find the strength within yourself. Plunge into the unknown, putting trust in your skill, wit, and flexibility. Move on from the suspended animation that’s kept you in limbo for so long."
    },
  },
  "Death": {
    upright: {
      title: "Profound Change • New Chapter • Renewal",
      text: "This can be a frightening card to receive at first. Loss and change are inevitable and often quite painful. Brace yourself to shed something that seems integral to your life. But inevitably, out of its remains will grow something more beautiful and more adapted to your needs than you could have anticipated. Pulling the card of Death is just a sign of forthcoming renewal. Though it loses its familiar form, that which passes away only breaks down into simpler components and dissipates out into the universe."
    },
    reversed: {
      title: "Delayed Ending • Holding on • Resistance to Change",
      text: "Death. The dread of every new querent, but the experienced tarot reader welcomes it as an old friend. It is a card of release, regeneration, and rebirth. But an inverted Death spells some disconnect from the natural ebb and flow of things. Some bone-white hand is clutching and grasping, unable to let go. Take care that stagnant, fetid energy does not build up in your life. Honor your dead, and bury them. The time is coming for you to say goodbye."
    }
  },
  "Temperance": {
    upright: {
      title: "Maintaining Balance • Moderation • Giving",
      text: "Learning to maintain a balance is essential to survival. Though temptations will perpetually beckon, most sensual delights will prove sweeter in moderation. An excess can be toxic- don’t numb or harm yourself through overindulgence. If you find yourself with more than you need, a neighbor may benefit from your surplus. By sharing with others, life retains its distinct and magnificent flavors."
    },
    reversed: {
      title: "Loss of Balance • Indulging in Vices • Letting go ",
      text: "Everything in moderation... including moderation. Inverted, the cups spill out and a wave washes the upturned figure into oblivion. It’s time to let go! Indulge in your vices. Don’t hold yourself back. Restraint and discipline are important to a healthy lifestyle, but unyielding rigidity can turn rich delight into meaningless ritual. It’s okay to let yourself go sometimes, like a flash flood sweeps away detritus and leaves the desert shimmering and new in the sunrise."
    }
  },
  "The Devil": {
    upright: {
      title: "Temptation • Materialism • Avoiding Self",
      text: "There are many reasons to dwell in false realities. More often than not, it is out of sheer convenience: life is not amazing, but it’s comfortable. Maintaining the status quo is easier than confronting any deep-seated issues that are quietly eroding your sanity. The Devil is in fact a counterpoint to Temperance- something is out of balance, but you lack the courage or acuity to address it. To break the serpent’s gaze means acknowledging where you truly are, and that can be discomfiting. Ask yourself if avoiding a harsh truth is worth living in a distorted dream world."
    },
    reversed: {
      title: "Excessive Gluttony • Need for Freedom • Cleansing",
      text: "Inverted, even the barren, wind-swept path is obscured, the snake almost indistinguishable in the gloom. Dominating the scene are the gnarled trees, promising a day of fruitless wandering in their sable shade. The Devil is a card of vice and worldliness, and if you receive its inversion, it may be a sign you’ve tread these dark paths too long. The tantalizing temptations soon sour and rot, and their cloying odor pervades your days. Leave the forest. Come back into the sun."
    }
  },
  "The Tower": {
    upright: {
      title: "Catastrophe • Accident • Swift Change",
      text: "The Tower suggests a sudden and unwelcome change after mindless self-absorption. Eventually equilibrium will restore itself, like tectonic plates slamming into place. Be ready for it, reap what blessings you can from this swift ruination. Amidst the rubble there is a truth long rejected, and in a way, it will set you free. You have a chance to start anew on firmer ground."
    },
    reversed: {
      title: "obstacles ahead • shaky ground • preparation for loss",
      text: "Upright, the Tower is a card of sudden, relentless chaos, something coming to an abrupt end. But inverted, the Tower almost seems tucked away, ensconced beneath the cliff and obscured by the cascading tree. You may be on shaky ground, but you still have some time to prepare or readjust before the forthcoming fall. Discretion is your best ally right now. Hold fast to your convictions and beliefs. Destruction is certainly possible, but it isn’t inevitable."
    }
  },
  "The Star": {
    upright: {
      title: "opportunity • hope • inspiration",
      text: "The Star is a beacon of hope. Though the night is dark and arduous, across the sky are scattered reminders that suns blaze perpetually, even if our own is hidden from sight. Believe the sun will rise, not as an empty sentiment but an immutable law of nature. For now, let the subtle radiance light your way, splayed galaxies working in concert to guide you home."
    },
    reversed: {
      title: "blind faith • need for a clear mind • disappointment",
      text: "The Star is a card of hope, but inverted it tells a most insidious story of blind faith. Not everything- or everyone- deserves your trust. Some things should not be hoped for, either because they’re unrealistic, evil, or would simply not pan out in the way you expect them to. Disentangle from fruitless fantasy, untether from the narratives you’ve built up around you over time. Things may not work out perfectly- indeed, they rarely do- but stay grounded so you’re ready for the inevitable snarls and thorns."
    }
  },
  "The Moon": {
    upright: {
      title: "secrets • confronting self • illusions",
      text: "When the moon rises, it’s as if your familiar surroundings become an eerie shadow world. The fears and sadnesses so repressed in your daily life become starkly apparent, and you are forced to confront your often neglected subconsciousness. This world, though fraught with wild imaginings, is somehow truer than reality, and there is much to learn from your journey through it. The shimmering stillness of your inner being is always present, but rarely traversed."
    },
    reversed: {
      title: "shedding secrets • honesty • introspection",
      text: "The reversed Moon beckons you within. It is a card of introspection and illusion, and its inverted position suggests your subconscious is no longer serving you. You have grown too reliant on instinct and feeling, and you are finding your way increasingly inscrutable in the anemic light of the fickle moon. Pull yourself out of your soporific daydream and be frank with yourself. Your inner voice is a valuable tool, but it’s not substitute for the stark relief of day."
    }
  },
  "The Sun": {
    upright: {
      title: "greatness • joy • enlightenment",
      text: "When the Sun turns up in a reading, use it as a reminder that life is wonderful and precious. Its radiant beams will light up even the darkest aspects of your existence, and you do not need to be afraid or doubtful for your future. Its warmth will wrap around your being and enliven it. If it is not readily apparent, be calm and search deeper, it is sure to reveal itself in due time. If you are lucky enough to bask in the greatness of the sun, share it with those you love; it will bring them joy and reassurance as they themselves tread through shadow."
    },
    reversed: {
      title: "feeling adrift • difficulty manifesting joy • despair",
      text: "A bouquet of flowers plummets through the cosmos, its viscous essence spread out among the stars. What was once joyous abandon has become a hemorrhaging, chaotic mess. When you pull this card, you may feel adrift, plunging through a period of shadow and despair. Your best qualities are having trouble manifesting of late. When in need, lean on others who have a clearer path; bask in their energy whilst you recharge your own. The Sun can’t stay out of sight forever."
    }
  },
  "Judgement": {
    upright: {
      title: "decisions • transitions • endings",
      text: "The swirling mist beckons you in. Of course, crossing the threshold into the unknown will be daunting. The end of a journey can always be sad. But it is time to make matter-of-fact decisions, and decide if where you are now is worth stagnating in the face of resplendent rejuvenation."
    },
    reversed: {
      title: "self doubt • poor judgement • hasty action",
      text: "Energy lists like a fog from an exterior vortex, spreading out and up to.ward the hapless querent. Everyone makes judgements about the people around them, but being the subject of severe scrutiny is never comfortable. Weigh your actions and behaviors carefully against your prescribed set of ethics. Are you living up to your own standards? Are you act.ing in good conscience? Be detached, be discerning, and be honest with yourself if the scales are shifting this way or that. Right the wrongs."
    }
  },
  "The World": {
    upright: {
      title: "completion • success • fulfillment",
      text: "After a long, harrowing, learning curve, you have finally integrated the many competing aspects for your life. Master of your destiny, you observe life from afar, watching how it blends and merges within itself. Conflicts eased and doubts vanquished, take this well-deserved moment of tranquility to serve others. You are a pinnacle of competency and intelligence. And in the end, when you close your eyes you’ll see the world clearly – made up of everything you’ve ever known and all the places you call home."
    },
    reversed: {
      title: "lacking fulfillment • feeling off • delayed successes",
      text: "Sometimes, you have the World at your fingertips; sometimes it keeps you at arm’s length. All the individual components are there, but they’re not blending into a unified pattern. On the contrary, they seem to be spinning apart, flung outwards, helpless to resist entropic force. You’re probably having a hard time finding your center right now. It may be difficult to connect with your closest friends, and your home may feel unfamiliar, your clothes ill-fitting. Take a breath and surrender to the chaos. Let yourself be swept away."
    }
  },
  "Ace of Chalices": {
    upright: {
      title: "new emotion • intimate connection • love",
      text: "When the Ace of Chalices presents itself, some deep wellspring of emotional force is bubbling up inside you or around you. It promises the beginnings of an intimate connection, guided by the heart. Open yourself to love and compassion. Draw deep feelings to the surface and let them shine."
    },
    reversed: {
      title: "self-love • repressed emotions • inexpressible feelings",
      text: "An inverted Ace of Chalices gushes forth with the same radiant exuberance of its upright counterpart, but it seems to suggest a flowing within, somewhere deep below. Whatever nascent new feelings of love are bubbling up within you are not ready to break the surface and see the moonlit night. This could be an indication of a deeper issue; are you dis.connected from your feelings? Still healing from some painful trauma? Or it could simply be an importune time to begin a new journey of the heart?  Listen to what the fountain whispers and try to follow its advice."
    }
  },
  "Two of Chalices": {
    upright: {
      title: "shared connection • partnership • receptive",
      text: "By mixing freely with each other, sharing of ourselves without reservation, we allow people to see our true nature. Let your inner beauty course out, inspiring others to do the same. Be welcoming, receptive, and genuinely grateful for others’ presence in your life. They will meld and merge with your aura to create something vivacious and free."
    },
    reversed: {
      title: "changing love • ending relationship • disharmony",
      text: "Inverted, the eye is drawn not to the blissful lovers, but the gnarled trees above them, a wind listing through the barren branches. It’s almost too easy to read this card as a breakup, some dissolution of a longstanding oath. But the immutable fact is that love changes and grows, sometimes into unfamiliar and unwelcome shapes. The strongest relationships bend in the wind, their pliable core unharmed. But not all connections are worth maintaining, and some.times a strong gale will snap a branch that was rotting from the inside out."
    }
  },
  "Three of Chalices": {
    upright: {
      title: "friendship • synchronicity • shared experience",
      text: "It is a rare and wonderful thing to work together in unison; so much can be achieved when contrasting personalities coalesce to form a common purpose. Establish empathy; communicate your needs and desires with trusting candor. Seek in turn to meet the needs of others. Do not dwell in differences: all people crave love and acceptance, even if it is expressed in a million different ways. Tune yourself into these quiet voices and see if you can address some of these common, crying needs."
    },
    reversed: {
      title: "need for space • overly social • independence",
      text: "Wine sloshes out of the glasses, but the girls remain unperturbed, dancing to their own synchronous beat. Upside down, the chaos of the vortex sunset is more noticeable. The dancers seem poised precariously close to the edge of the bank. Relationships, platonic or otherwise, can be thrown into chaos by a simple misstep, collapsing in a heap when things seemed their most harmonious. Consider a period of separation. Give your partnerships some space and enjoy the quiet solitude of keeping yourself company. Or maybe make a new set of friends. Let your relationships ebb and flow naturally."
    }
  },
  "Four of Chalices": {
    upright: {
      title: "overindulgence • loss of excitement • apathy",
      text: "Life, for all its splendor, will sometimes lose its taste. This is most often a sign of overindulgence- inundating yourself with some fascination will deaden your senses to its unique charms and flavors. If you find yourself growing apathetic to a steady routine, stir things up within yourself. Resist the urge to settle. Though it may seem like a mighty effort, force yourself to be creative and original. Imbibe of the stream of life."
    },
    reversed: {
      title: "withdrawn • malaise • disinterest",
      text: "The inverted Four of Cups implores you to break out of your malaise. Cast your moody contemplations to the side. You still have many blessings, you need only look up to see the manifested all around you. If your cups are half empty, the river is a short walk away. Too long have you lingered in the shadow of the tree. Mindful gratitude is the first step to true contentment."
    }
  },
  "Five of Chalices": {
    upright: {
      title: "disappointment • failures • making new space",
      text: "Letting go of familiar trappings can be a wrenching experience, but sometimes decisive divestment is the only way to move forward. Rather than swirling in an endless whirlpool of uncertainty, it’s better to shed what you know and make room for fresher, more positive energy to enter your life. Pain is an ephemeral indicator of growth. Have the courage to dictate new chapters of your life."
    },
    reversed: {
      title: "moving on • making amends • setbacks",
      text: "Inverted, the discarded Chalices seem to be hurtling back towards the figure on the bank. His outstretched hand tries to mitigate the inevitable mess. If you have tried to cast something out of your life lately- a heartbreak, failure, or loss- you may not be done learning whatever lesson is intrinsic to this time. Stay humble and keep an open mind. Make amends where you can, and cut your losses when you need to with your head held high. Rectify your inner and outer experiences, and seek to live in harmony with the impermanent flow of being."
    }
  },
  "Six of Chalices": {
    upright: {
      title: "renewal • revisiting past memories • vibrancy",
      text: "The world can be harsh and unforgiving, and it’s easy to let the sorrow and grime of daily living dull the vibrant shine of your existence. But the river that flows through the Six of Chalices offers a chance to buff it clean. Renew yourself. Break the cycles of suffering by pursuing the simple, innocent values of childhood: share, work together, be kind to others. Immerse yourself. Forget your cares and rejuvenate."
    },
    reversed: {
      title: "lacking playfulness • need for rest • burn out",
      text: "Even inverted, the warm bonhomie of the Six of Cups shines through. The bather’s benevolent smirk is illuminated by the rosy clouds above. Her upturned position suggests your relationship with rest and rejuvenation is strained in some way. You may be approaching burn out, unable to cut yourself loose from some cumbersome undertaking. You may find yourself tugged by inexorable currents threatening to pull you below. Resist the supple whispers of the river and stay above the surface, imbibing in the dappled sunlight and lotus’s sweet scent."
    }
  },
  "Seven of Chalices": {
    upright: {
      title: "deception • dwelling in fantasy • choices",
      text: "The Seven warns of overindulgence: abusing sensual pleasures not for their own sake but to distract us from a more pressing matter. By allowing ourselves to be deceived, we deaden ourselves to our problems. It is a way to seclude ourselves from a harsh, embattled world. But dwelling too long in fantasy will leave us vulnerable to very real issues that will not go away if we ignore them."
    },
    reversed: {
      title: "limited options • difficult decisions • no information",
      text: "The Seven of Chalices denotes some kind of choice, but its inversion may be urging you to stay your final decision. Your options are limited, or may not be what they appear. You are lacking some vital piece of information, or worse, you may lack the power to choose at all. Consider each alternative carefully and seek to ascertain what’s missing from your environment. Like the cold-blooded snake, bide your time until the time is right to strike."
    }
  },
  "Eight of Chalices": {
    upright: {
      title: "confusion • uncertainty • escapism",
      text: "As executed in the Tower, sometimes life can hand you a swift, unpleasant surprise. You may have realized that something very important to you, a central hub of your existence, is essentially meaningless. The walls come tumbling down, and a miasma of confusion comes swirling in, replacing structure and verisimilitude with chaos and uncertainty. The only answer is to leave it all behind. In time, the mist will part, and reveal a midnight sky alight with stars."
    },
    reversed: {
      title: "obstruction • conflict • indecision",
      text: "Your way forward is obscured, and you are not sure if you should stay or go. Compelled to make a choice with such limited information, you feel ill at ease, caught between two conflicting realities. Breathe into it. Cognitive dissonance is uncomfortable but not impossible to live with. Locate your inner reserves and speak aloud your intentions. Clear your mind. You may not be able to make an ideal decision, but already the mist is beginning to clear."
    }
  },
  "Nine of Chalices": {
    upright: {
      title: "satisfaction • completed cycle • fulfillment",
      text: "The Nine of Chalices is all about satisfaction. Some ongoing cycle is nearing its completion, and you are about to be fulfilled and at peace. Like a sunset, this will not last forever, but its evanescent beauty makes it all the more precious. Treasure this moment, for its memory will bring you warmth on gray, rainy days."
    },
    reversed: {
      title: "lessened expectations • dissatisfaction • self-centering",
      text: "An inverted Nine of Chalices tells a wistful story of thwarted desire. Things have not panned out for you the way you had hoped, and now you’re a little lost, a little adrift, the taste of something sweeter still on your tongue. Be at ease. Still your heart. These shadowy times challenge us to respond with a centered, measured approach that encompasses more than our intense emotional experiences. Let your tears flow, but know that this is not forever. Your time in the sun will come again."
    }
  },
  "Ten of Chalices": {
    upright: {
      title: "bliss • harmony • alignment with others",
      text: "The Ten of Chalices reminds us that life can be a simple, unadulterated pleasure. Supported by family, our beliefs, our traditions, and our values, we can live in calm unity with each other. Our emotions link us to the supple lifeblood of the universe. Love connects us all. Life connects us all. We are one."
    },
    reversed: {
      title: "lost connection • struggle to maintain • misalignment",
      text: "Upside down, an intimate tableau becomes more perilous, the children clinging to the branches as if for dear life. The ten empty cups, suspended by delicate silver threads, have been returned to their upright positions. It urges you to consider the health of your house and home. Have you lost sight of your dearest relationships? Are you struggling to move on from some internal or external pain? Your once secure positions are being called into question. Reach out to your loved ones with empathy and ask what’s on their minds. Pursue authentic connections and be honest about your own feelings."
    }
  },
  "Page of Chalices": {
    upright: {
      title: "giving • open heart • emotional wellbeing",
      text: "Something as simple and pure as a bowl of water can initiate a journey of the heart. Don’t hoard your emotions, for fear of exhausting them. Take what little you have and give freely. You will find that whatever you expend will be returned to you in some grander, more compelling form. Surround yourself with love and light. Embark."
    },
    reversed: {
      title: "naivety • reassessing ideas • emotional immaturity",
      text: "Pages are like little Fools scattered about the deck, all fresh-faced innocence ready to take on the world. But sometimes discretion is the better part of naïveté; wait and listen before you strike out. You may be missing information, or neglecting logic in favor of a fickle heart. Take a step back. Regard the serpent before you and consider care.fully before climbing on its back. Not every beast is worth the ride."
    }
  },
  "Knight of Chalices": {
    upright: {
      title: "unfettered emotion • mixed feelings • devotion",
      text: "Unfettered emotion is a powerful thing. Knowing no barriers, no painful ends, it marauds on endlessly, deaf to diminishing voices. Cavalier devotion to matters of the heart can often lead to a swift dethroning, but at the apogee of your quixotic journey, have no fear of the imminent plunge. Mount your furiously swirling emotions and ride them to the end."
    },
    reversed: {
      title: "volatile emotions • hapless idealism • regrets",
      text: "Bucking wildly, our hapless hero is beginning to regret his decision. He took a risk, mounted the luminous serpent, and was not so much betrayed as he was disregarded, barely registering on the snake’s scaly back. His erstwhile idealism is about to lay him waste. If you receive this card, calm the turbulent waters of your life. Remove yourself from volatile or unsafe situations. Your calculations were incorrect, you’re moments from ruin, and it’s time to set yourself back down on the shore. Catch your breath."
    }
  },
  "Queen of Chalices": {
    upright: {
      title: "intuitive • compassionate • emotionally secure",
      text: "Feelings are often discounted as too amorphous and changeable. Yet it is their endless malleability that gives them their fluid power. They can take out any form, still charged with the power of the mighty subconscious, they are the surging forces within our beings that make us strong. When you draw the Queen of Chalices, it is time to tune in with the feelings at bay. Trust your intuitions. Reach out to others; find what makes them thrive and delight."
    },
    reversed: {
      title: "introspective • self care • listen to your heart",
      text: "Your subconscious is trying to tell you something, but you cannot hear it over the roar of the river, the waterfall, and the shimmer of the snake spirit. It is drowned out. She waits patiently, her chalice unspilled, even in its inversion. Try to tune in with her mellifluous voice. It is in the pause in between each breath. It is the gentle ripple spreading out across the pond. Spend some time in the moonlight and nourish your innermost desires."
    }
  },
  "King of Chalices": {
    upright: {
      title: "reigning emotions • powerful conduit • in control",
      text: "The King is all about reigning in the emotions. Recognizing to their true pow.er, he carves out channels for them to flow in advantageous, intentional ways. Shepherd of the roiling river, he is master of its destiny, and it lends its churning strength to his designs. By harnessing your emotions, you become lord of your own experience, directing the formless energy into hale, corporeal creation."
    },
    reversed: {
      title: "melancholy • disempowered • need for honesty",
      text: "The inverted King strikes a melancholic figure; the water and metamorphosed serpent seem out of his sphere of influence. He suggests caution and latency in the querent, and may be a symbol that a relationship is seriously out of synchronicity. You may feel disempowered to act on your true feelings. Try to be honest with yourself, and if that fails, listen to the advice of others you love. Emotions, like coursing water, can erode the strongest structure over time. Take care that yours are being channeled into a help, nondestructive place."
    }
  },
  "Ace of Pentacles": {
    upright: {
      title: "material reward • new adventure • abundance",
      text: "When you see a tantalizing opportunity, take it. This card promises great material reward for projects undertaken, particularly if they’re something novel or unexplored. Though you may not be able to see over the wall and divine what you are truly choosing, dare to take the road less traveled. You may find that it pays off in the long run. Rise up to the challenge and begin your new adventure."
    },
    reversed: {
      title: "hesitation • assess options • lost opportunity",
      text: "A new beginning beckons, but you hesitate on the threshold, unsure if you want to proceed. You can only partway see into the open door, and there’s no guarantee that what lies beyond is greener pastures. Every door is an exit and an entrance. Before you set off somewhere new, take a close look at your current surroundings. Look for smaller details you may have missed. You may already be in a better situation than you realized."
    }
  },
  "Two of Pentacles": {
    upright: {
      title: "balancing work • productive • priorities",
      text: "Life’s imbalance is its greatest strength. To the man that masters the back and forth motion, the perpetual movement propels him into a steady, productive rhythm. Keep it all together by not paying too much attention to one thing. Accept that everything has its time and its place, and it is up to you to decide when it’s time to move onwards."
    },
    reversed: {
      title: "imbalance • off course • re-prioritize",
      text: "The Two of Pentacles is a push and a pull, an ebb and a flow, and its inversion suggests that something has been knocked out of balance. You may feel out of sync with your environment, or something within you is weighing you down and pulling you off course. Spend a little time finding your center, your axis of rotation around which your life force flows. Once you are right with yourself, you may find the rest of the world falls more easily into formation around you."
    }
  },
  "Three of Pentacles": {
    upright: {
      title: "achievement • hard work • shared goal",
      text: "After the early stages of a project, there is a surge of pleasure in realizing you’ve achieved some tangible level of competency. Take pride in your work: be meticulous and patient, giving credit to the noble endeavor you’ve chosen to undertake. Likewise, as each brick supports its brother, this is a good time to interlock your plan with other visions. Let other people’s input influence your own. This is a great time to build stability and trust."
    },
    reversed: {
      title: "doing the wrong thing • reluctance • stepping back",
      text: "Once you’ve settled into a project, it’s gratifying to see its early results. But when the first milestone isn’t what you expect it to be, an inverted Three of Pentacles can be an indication you’re on the wrong track. If you are finding resistance, through your own reluctance or other people’s obstructions, your gifts may be put to more efficacious uses. This can mean reducing your involvement and stepping away from a project. It’s not failure, but simply reassessing your resources and diverting them to where they really need to go."
    }
  },
  "Four of Pentacles": {
    upright: { 
      title: "greed • selfishness • materialistic",
      text: "These are some of the few Pentacles in the suit that do not glimmer. By hoarding his abundance, refusing to share or invest, the miser’s wealth has become stagnant, self-diminished. Blind to his spiritual penury, he believes he has succeeded in his ventures. Take a lesson from this unhappy man. A dependence on the status quo will only leave you unprepared when change inevitably shakes you. Relinquish your grip. Let yourself go."
    },
    reversed: {
      title: "reassess pleasures • spiritual importance • value",
      text: "While the upright Four of Pentacles urges you to value your gifts, its inversion imparts a more cautious tale. Scrutinize the possessions and resources whose everyday worth you take for granted. Are they as important to you as you believe? Are they bringing health and wealth into your life like they have in the past? Look about, look above, seek unknown pleasures that are not yet in your grasp. Relax your emphasis on tangible, worldly prosperity and shift your gaze to intangible, spiritual growth."
    }
  },
  "Five of Pentacles": {
    upright: { 
      title: "financial loss • humility • vanquishment",
      text: "A troubling card, the Five of Pentacles warns of utter vanquishment. This may be a result of your own mishandling of a situation, or the sheer, unhappy randomness of fate. Either way, you have reached rock bottom, and you simply must accept your unmitigated defeat. As you learn the bitter lessons of humility, your true needs become starkly apparent. This is an opportunity for you. Everything that had power over you has been razed to the ground. Rally, and amass what little you need to start again."
    },
    reversed: {
      title: "depleted • need for rest • slow rejuvenation",
      text: "You have gazed into the void and come out the other side, relatively unperturbed. Your doom is not assured; your defeat, if it comes, will be mitigated by merciful circumstance. While you may be feeling some burn out, you are long from exhausting your last reserves of strength. Continue to eat well, get enough rest, and stay connected to your loved ones. Spend some time outside, drawing power from the earth. This may not be a period of thriving growth for you, but it doesn’t spell your total ruination either."
    }
  },
  "Six of Pentacles": {
    upright: {
      title: "excess • generosity • paying it forward",
      text: "After many struggles and painful learning experiences, life has granted you the luxury of excess. When this happens, don’t be greedy and keep the wealth to yourself. Give freely, never forgetting your own hard times that have brought you to this day. Alternatively, if you are in need of charity, don’t be too proud to receive it. Often life will restore its equilibrium without your consent, when you are least prepared. Therefore, if you find someone willing to tip the scale back in your favor, don’t hesitate. You will pay back the debt in full when you’re better off."
    },
    reversed: {
      title: "self charity • financial help • equilibrium",
      text: "After a cycle of give and take, it’s healthy to take a pause and consider your own needs foremost. Giving generously of yourself is an admirable quality, as is possessing the humility to receive what flows from others. But healthy boundaries are also essential to a close relationship. Take a step back if you feel the love is moving too readily in one direction but not the other. Advocate for your needs and respect the barriers that others construct. Be judicious and seek to attain equilibrium."
    }
  },
  "Seven of Pentacles": {
    upright: {  
      title: "setting intentions • great reward • future planning",
      text: "Innocuous and unassuming, within every seed rests a sleeping empire. Whether or not it rises from dormancy depends on many factors, not the least of which is simple chance. Nevertheless, whatever you cultivate has a good chance of surviving into maturity, so take care that what you are planting is wholesome and fully accounted for. Don’t be fooled by the smallness of their being. Potent, fertile, they wait to sire nations."
    },
    reversed: {
      title: "limited success • determining worth • starting fresh",
      text: "Upside down, the gardener appears to be digging the Pentacles out of the earth rather than bury them deeper into the dirt. Whatever she planted has not taken root, and the ungerminated seeds are just taking up space in her plot of land. Intentionally consider what worked for you and what didn’t, and be humble enough to learn from your mistakes. Of course, sometimes you can do everything right and still fail. An unkind soil, paltry light, fierce wind... there are many factors that contribute to a scant harvest. Set your sights on new ground and move toward it."
    }
  },
  "Eight of Pentacles": {
    upright: {
      title: "blooming success • meaningful growth • skilled",
      text: "After the first few harrowing weeks, when a project is still touch and go, it is a real pleasure to see measurable success blooming before your eyes. Take delight in what you have achieved. Steadily cultivate what you have already established so it continues to grow in meaningful ways. Pay attention to detail. Fortune has little influence at this point; rather, your dedication and finesse will guarantee the success of your undertaking."
    },  
    reversed: {
      title: "perfectionism • bigger picture • refocus priorities",
      text: "As children, we are told that hard work is the key to success. But as we age, we find charisma, intelligence, and even pure luck play important roles in finally achieving our dreams. If you have been focused on the task at hand, diligently working toward some larger goal, it can be disappointing to see your efforts come to naught. Worse still when they yield something unfamiliar or unwelcome, something beyond your control. Consider the bigger picture and be realistic about what your endeavors have wrought. Discard what no longer serves you."
    }
  },
  "Nine of Pentacles": {
    upright: {
      title: "reward • luxuries • financial independence",
      text: "The Nine of Pentacles is its own reward. After sacrificing and devoting yourself to a single purpose, your dedication has paid off. You’re now well established in whatever it is that you set out to do, and you can afford the luxuries that come with a life of success. Enjoy it. There will come a time when you are tested and tried. Retain your sense of propriety and discipline, and you will be well prepared when this time befalls you."
    },
    reversed: {
      title: "self-gratitude • realizing strengths • focusing energy",
      text: "Within the self grow many multitudes, ephemeral and eternal all at once. An inverted Nine of Pentacles calls on that swirling core. Find the source of your energy welling up from deep below. You are blooming, coming alive, and soon you will burst forth into the world with all the verdant luminescence of a goddess. Take stock of your gifts, as they will serve you and others in the coming time of prosperity and joy."
    }
  },
  "Ten of Pentacles": {
    upright: {
      title: "Full potential • financial abundance • achievement",
      text: "Your hard work and dedication have reached their full potential- you have seen your endeavors blossom in full. Now, you need only to harvest the fruits of your labors; they will be abundant for many years to come. Enjoy earthly comforts, as they are richly deserved. This is not the time to begin earthmoving enterprises. Instead, focus on maintaining what you have already achieved. You have devoted yourself to the cultivation of the earth. Let her reward you in kind."
    },
    reversed: {
      title: "financial loss • humility • filling a void",
      text: "As the family recedes over the horizon, the inverted Ten of Pentacles tells a wistful tale of loss and sorrow. This may indicate a period of valued but strained relationships, like those in your household or job. After a period of growth, you have eaten of earth’s richest pleasures but still feel a nagging emptiness. There is some void within you not being filled. Probe its edges, find its shape. What you do to address it is up to you, but acknowledging its existence and giving it a name is your first step toward wholeness."
    }
  },
  "Page of Pentacles": {
    upright: {
      title: "financial gift • new skill • security",
      text: "When you draw this card, you have been handed a gift from the universe. This could be anything: a new job, a loan or inheritance, even a budding relationship. It could be some untapped talent within yourself you are just beginning to realize. Whatever it is, it will further your reach in the material world. Use the jaunty confidence of the Page to break ground on your new endeavor. There is the promise of greater wealth, security, and influence. It’s a good time to be alive- so enjoy it."
    },
    reversed: {
      title: "lack of inspiration • limited resources • struggling",
      text: "A pen hovering over a blank page. The breath before the plunge. Often, the first step of a journey requires the greatest courage and the most creativity. If you are not feeling inspired in this moment of potency, it can be an indication that you are not ready to start anew. You may be in a chaotic or distracted headspace, struggling to manifest the energy you feel within. Your resources may be limited, and your support system could be more robust. There’s no need to force what doesn’t come naturally. Go back to the drawing board and refine your initial vision."
    }
  },
  "Knight of Pentacles": {
    upright: {
      title: "fixated on money • growing dependent • losing meaning",
      text: "The Knight is a conflicted creature. Having attained no small degree of success, he grows dependent on the tokens that have carried him safely thus far. He no longer sees their interconnected beauty; merely their utility. He is fixated on furthering his causes. If you pull this Knight in a reading, know that you may need to back off a little. Take a broader view. Appreciate the magic that makes your lifestyle possible. Otherwise, you will face a Pyrrhic victory devoid of meaning or gratification."
    },
    reversed: {
      title: "sloth • material malaise • forgotten beginnings",
      text: "The Knight of Pentacles is no less despondent in his inversion. If anything, he is a clearer warning against the malaise of the material world. You have grazed too long in this stagnant field, feeling tied to the earth, as it has been nourished by your blood, sweat, and tears. Why did you till this ground in the first place? Surely, it was to nourish your body and bring peace to your life. Take stock. If you are no better off, the doldrums even worse than before, it’s time to shed some unwanted weight and move on."
    }
  },
  "Queen of Pentacles": {
    upright: {
      title: "masterful strength • force of creation • grounded",
      text: "The Queen of Pentacles is a wonderful sign: she is the embodiment of natural goodness. She is the earthbound answer to the Empress, hale and warm and ready to provide a safe haven. If you see her crop up in a reading, you are a powerful force for creation. You are grounded in reality, exuding a subtle, masterful strength that can be channeled into any endeavor. Be prepared for everything you touch to blossom under your hand."
    },
    reversed: {
      title: "Inner strength • solitude with nature • independent",
      text: "Rich and fertile in her own right, an inverted Queen of Pentacles walks a quieter path. Her warmth, emanating from deep within, may be less visible on the surface. But this Queen knows her worth, sustained by a vibrant inner life. She may hesitate to engage with the world around her, preferring her own company or that of the natural world. But if you spend too long in the green world, you may find yourself too rooted to the ground, unable to shake off the life that has grown up around you. Stay close to the surface. Keep the sun’s light on your face."
    }
  },
  "King of Pentacles": {
    upright: {
      title: "competent • leader • mastery of environment",
      text: "If you crave mastery of your environment, there is no better card to draw than the King of Pentacles. He is the pinnacle of experience, hard work, and blunt intelligence, and as a result, he is relied upon in his community for his competence. Embody his power and ability to get things done. You do not need to wait for inspiration. You can stoke the fire within yourself. Muster all your strength and hurtle over anything that stands in your way."
    },
    reversed: {
      title: "effortless • powerful energy • support community",
      text: "Upside down, the catapulting King of Coins vaults upright, holding the bull aloft with apparently effortless strength. Masterful and determined, the strawberries orbit his tawny torso. His appearance means you have tapped into a powerful energy that is not yet manifesting in the world. It is welling up from within you, ready to take hold. Now is not the time for self-doubt. Look for ways you can support your community and bolster the world around you. Trust your strengths. Elevate yourself."
    }
  },
  "Ace of Swords": {
    upright: {
      title: "Mental clarity • determination • intellectual power",
      text: "The Ace of Swords cleaves through indecision and deceit. It is the mental clarity that comes with keen intelligence. It may indicate an epiphany. When you pull this card, you may be driven with a determination borne of ruthlessness. Examine your motivations and ensure you’re not being too tyrannical. Master the sword, and wield its mighty power for good."
    },
    reversed: {
      title: "muted thoughts • overconfidence • misjudgment",
      text: "Inverted, the Ace of Swords points aloft, its tip still obscured by the fall.en snow. The bird on its hilt is less formidable, more muted. If you are seeking the unequivocal truth, you may find it resides in shades of gray right now. Try a subtler approach. Remove the influence of ego as best you can. Ask yourself if you are being overconfident in your assumptions. Listen to others and try to get a holistic understanding of the situation. It is instinct, not intellect, that will guide you now."
    }
  },
  "Two of Swords": {
    upright: {
      title: "avoiding truth • approaching blindly • surfacing fears",
      text: "Departing greatly from the cold clarity of the Ace, the Two of Swords is a warning against delusion and false reality. No matter how guarded you are, if you are blind to the situation at hand, you will miscalculate and blunder. Don’t flinch from the truth, as it is often less dire than the many insidious realities your mind conjures up in the darkness. Do not let needless fears disturb you. Find balance."
    },
    reversed: {
      title: "embracing reality • facing fear • lowering defenses",
      text: "As the upright Two of Swords suggests a needless fear, the inversion confirms it: it’s time to let down your defenses. You may have already begun this pro.cess. If your watch continues unabated, you may hurt due to some unintentional damage. You have the courage to cast off your blindfold and observe your surroundings, illuminated as they are by the light of the moon. Embrace and adapt to your true reality, not the one you conjured up in dreams."
    }
  },
  "Three of Swords": {
    upright: {
      title: "sorrow • mental pain • grief",
      text: "This card is a stark warning that even the swiftest animal can be brought down by treachery. It may be possible that you plan to wield the sword yourself. If this is true, know your actions irreparably shape the world you live in."
    },
    reversed: {
      title: "releasing pain • sitting with sadness • acceptance",
      text: "The bleeding stag is never a pleasant guest in a querent’s spread, but its inversion suggests this bitter visitation is at an end. What is your relationship with grief right now? If you are holding it off, believing it will be less painful at bay, let it come rushing in. You will find deep truths about yourself revealed in this deluge of sorrow. With acceptance comes healing, both of yourself and the people around you. Forgive even those who have not apologized and most importantly, forgive yourself. You cannot stay in mourning forever."
    }
  },
  "Four of Swords": {
    upright: {
      title: "contemplation • reflection • pause",
      text: "The stillness of winter is the perfect environment for quiet, contemplative repose. Take this time to restore and reflect. Amass your strength and gain perspective and clarity. Lay your struggles aside for now, in this moment of peace."
    },
    reversed: {
      title: "exhaustion • amassing strength • resilience",
      text: "Too long have you lain in repose. Your sword braces you, ready to help you to your feet. Though the wind buffets wildly and your way forward is grim, there is nothing for it but to draw up your strength and press on. Find shelter where you can, but it may be sparse in coming, especially as you leave this period of relative comfort. Be at peace. You have a steely resilience born of hard-won experience that will see you through to this winter’s end."
    }
  },
  "Five of Swords": {
    upright: {
      title: "confrontation • disagreement • pacifying anger",
      text: "Confrontation is inevitable, and can even be an honorable, an upfront way to achieve one’s ends. The two locked in combat are practiced warriors of this art, and their baleful dance pays tribute to the intricacies of strife and competition. The Five of Swords, however, encourages you to lay down your weapons.<br> When you pacify your anger, you may be surprised to notice a different path, that of equanimity and transcendence. Let yourself be soothed and follow the butterfly."
    },
    reversed: {
      title: "avoid conflict • forgiveness • reconciliation",
      text: "An inverted Five of Swords is an indication that forthcoming conflict is ill-advised and ill-fated. Deescalate any gridlocked arguments, and if you cannot dismantle them completely, consider leaving them to the side for now. There’s a chance that the conflict is not due to outside circumstances, but rather some raw discomfort within yourself. Distracted by quibbles, you may be neglecting a more pressing issue. Reflect, forgive, and harmonize with your surroundings."
    }
  },
  "Six of Swords": {
    upright: {
      title: "moving on • freedom • transition",
      text: "The Six of Swords has a simple message: move on. If you have exhausted the potential of some place or circumstance, it is time to flit away. Don’t hold onto something out of maudlin nostalgia, or worse, fear of change and the unknown. Recognize the simplicity of your venture and float on, towards freedom, towards change, towards adventure."
    },
    reversed: {
      title: "holding back • uncertainty • resisting change",
      text: "The inverted Six of Swords is a mirror reflection of its original intent: the butterflies appear to be retreating backwards to safety, the trees shepherding their hurried escape. If you are struggling to depart a situation, ask what holds you back. Is there unfinished business? Or is it something less tangible, some unnamed fear, keeping you in place? By all means, keep your promises and fulfill your obligations. But once you are done, don’t hesitate to sever ties and move on."
    }
  },
  "Seven of Swords": {
    upright: {
      title: "cutting ties • speaking your mind • deception",
      text: "Sometimes it’s best to cut your losses. Words may remain unspoken, but the feelings that drive them will not be dispelled. Eventually your true thoughts will become clear, and you don’t necessarily need to be around when this takes place. This will isolate you, and you may spend many icy evenings in the wilderness, enduring a bleak existence. Ask yourself if cutting ties is worth this lonely lifestyle. You have a right to speak your mind. When you are forthcoming and strong you will never need to cloak your true feelings."
    },  
    reversed: {
      title: "true intentions • facing things head on • self worth",
      text: "As you flee, look over your shoulder and see what you are leaving behind. Are you withdrawing for the right reasons? It is usually in your best interest to remove yourself from an unpleasant situation, but the inverted Seven of Swords suggests you take a closer look this time. Gauge your true intentions before cutting loose. You might rob yourself of some valuable growth if you simply evade what assails you. You have power and agency. Your voice deserves to be heard. You still have some role to play before bowing out of these circumstances for good."
    }
  },
  "Eight of Swords": {
    upright: {
      title: "self-imprisonment • despair • victim mentality",
      text: "Grief and anguish can hone the mind until nothing is left but the fine knife’s edge. In this state of keen despair, you may actually be blind to the wide landscape that promises a release from a self-imposed imprisonment. The swords are driven into the ground. You are not. Pick yourself up and survey the full context of your situation."
    },
    reversed: {
      title: "self-deception • learning limits • introspection",
      text: "The Eight of Swords, usually a warning against self-deception, acknowledges the reader’s authenticity in its reversal. You have done some heartfelt introspection, possibly guided by some mentor or counselor. It’s a time of connecting the dots and learning the edges of your limitations and beliefs. It also speaks of leaving a more difficult time. You may feel at ease to lower your defenses and let people in. The larger world has a lot to offer and you have only seen a tiny fraction. Be like the butterfly and float on."
    }
  },
  "Nine of Swords": {
    upright: {
      title: "fear • vulnerability • paralysis",
      text: "A cruel card, the Nine of Swords depicts fear so great, it leaves the martyr numb to the onslaught of forthcoming pain. Fear cripples any riposte, leaving him vulnerable to a swift destruction.<br> But take heed from his paralysis. Though the situation is grave, it is his passivity that ensures his ruin. If you find yourself overwhelmed by hopelessness and despair, don’t respond like this hapless figure. Face your fears with valor and dignity, trusting that your enemy will be overcome."
    },
    reversed: {
      title: "turmoil • anxiety • self-doubt",  
      text: "The Swan of Swords is no less daunting coming from below. The beast is a powerful portent of a turmoil within you, suggesting some stricken paralysis that is keeping you locked in place. Your anxiety is more acute than usual, and you are hearing the specters of self-doubt as you seek to connect with others. Your friends and family love you, and they see your struggle. It may just take some time for you to be able to see it. A period of rest may be welcome before beginning a new chapter. Tend to your most basic needs."
    } 
  },
  "Ten of Swords": {
    upright: {
      title: "hard endings • misfortunes • defeat",
      text: "In a byzantine way, the Ten of Swords can be quite encouraging. After the dread and anguish leading up to this moment, the worst has finally fallen. Your misfortunes have defeated you. Find peace at last in the quiet repose of death."
    },
    reversed: {
      title: "lingering pain • resistance • fatigue",
      text: "Alas, whatever period of hardship you’re in is not quite ready to close. There are a few more painful days to come. But do not despair. After fatigue and many tearful nights, you have learned the valuable skills of patience and transcendence. Your pain does not define you, but it can awaken a core of inner strength that would have lain dormant within you in happier times. Listen carefully to what this cycle is trying to teach you. Whatever awaits you may not be pleasant, but it is a vital and inescapable truth."
    }
  },
  "Page of Swords": {
    upright: {
      title: "sharp mind • new strategy • clear direction",
      text: "The eager youth of the Page, combined with the penetrating intelligence of her suit, makes her formidable defender against false realities. Be vigilant, wary, and free from emotional pall so that you may discern the best course of action. You have within you the power and means to chop through duplicity. Frankness, honesty, and justice will serve you well."
    },
    reversed: {
      title: "complex truth • question beliefs • take time",
      text: "An inverted Page of Swords speaks to a complex relationship with truth and authenticity. Carefully probe your beliefs for narratives that no longer serve you. Take what people say with a grain of salt. Consider how everything fits into the larger picture, and observe what seems out of sync with its surroundings. Operate as if you are working with limited information, because there’s a very good chance that you are."
    }
  },
  "Knight of Swords": {
    upright: {
      title: "ambitious • fixated on goals • determined",
      text: "For all his ardor, the Knight can be cold and unfeeling. Focused only on achieving victory, he neglects empathy, compassion and restraint. If you find him in a draw, look deeply into your methods and means. If you find your approaches lukewarm or weak-willed, imbue yourself with his cavalier determination. But if you are overly imperious, or fixated only on achieving your goals, it may be time to take a step back, consider the feelings of others and allow new energy to flow into your life."
    },
    reversed: {
      title: "defensive • questioning beliefs • busy mind",
      text: "An inverted Knight of Swords seems to defend rather than attack. His typically bold, impetuous energy is a little stilted, and he may be questioning whether his crusade is as benign as he first believed. He will need to examine his assumptions and behaviors, asking his peers and mentors for their detached observations. With much to consider, this knight won’t fail due to a lack of vision or force of will. What’s more likely is committing a careless mistake because he was too distracted to see an opponent coming."
    }
  },
  "Queen of Swords": {
    upright: {
      title: "intelligence • truth • mental clarity",
      text: "When you see the Queen in a reading, it is time to reign in your demons. You no longer have the excuse of inexperience, ignorance, or even fear. Use your immense intelligence and love of truth to conquer what plagues you. When you do, you’ll be able to access matters of the heart with cool mental clarity and grace."
    },
    reversed: {
      title: "unprepared • easily swayed • weakened resolve",
      text: "An inverted Queen of Swords suggests that you are having trouble mastering what vexes you. Most likely, a period of suffering has dimmed your shine and weakened your once staunch resolve. Take a pause and regroup if this is an ongoing conflict. You need time to grow your strength. Study your opponent from afar and hone your skills. If you attempt to overcome a looming adversary before you are ready, you risk losing a battle you would have won at a more auspicious time."
    }
  },
  "King of Swords": {
    upright: {
      title: "clarity of purpose • realistic expectation • ingenuity",
      text: "It takes a great man not just to fight evil, but to subsume it, divert it, and use it for good. Such an immense task calls for impeccable character and keen clarity of purpose. Realism and ingenuity are your greatest weapons when faced with a mighty foe; do not let good sense to become clouded with emotions. Face the facts with cold stoicism and find the best way to proceed. The answer may be simpler than you think."
    },
    reversed: {
      title: "strategy • intelligence • cunning approach",
      text: "An inverted King of Swords belies a potent energy at work, perhaps behind the scenes, still undetected. He is seeking the nest of the beast that plagues his people, ready to rout it for good. This King’s strength lies in his intellect; he has little need of force if a shrewd strategy will do. Ultimately, the element of surprise will catch the growing cygnets unaware, and the wily monarch will make quick work of them. His people will be free."
    }
  },

  "Ace of Wands": {
    upright: {
      title: "new opportunity • strong energy • inspiration",
      text: "When you receive this card, you have struck upon a vein of potent energy. If you choose to manifest it, you will be propelled into some grand adventure, wrought with passion and despair. Much will be required of you: creativity, compassion, and steady discipline; but if you tru.ly believe in your dream, fight for it until the end. Capitalize on this heady excitement. Pursue without fear or hesitation any idea that seems promising. Above all, believe in yourself and your potential."
    },
    reversed: {
      title: "slow to start • divided energy • distraction",
      text: "The Ace of Wands juts forth from the fertile ground. But its inverted position may suggest that rather than bursting out in the world around you, there is a deeper core of excitement and potential that first must grow in your own heart. Passion is bubbling up within you, but there is something blocking its path to the moonlit surface. You may find it hard to focus, preoccupied with your unrealized vision. Keep a low burn, and take care not to extinguish your inner fire. It will blaze the way for you in a more precipitous time."
    }
  },
  "Two of Wands": {
    upright: {
      title: "planning • looking ahead • clear mind",
      text: "Divine inspiration without tangible manifestation is a beautiful dream. Careful planning is the stoic, immutable foundation of any newfound enterprise. Be levelheaded and down to earth: practice self-discipline and good sense. But never forget how anointed you felt when you drew the first bolt toward you. Your unique creativity and passion are about to serve a great purpose. Be you- by daring to show your truest self, you will attract the people you need toward you."
    },
    reversed: {
      title: "reassessing ideas • creative block • different direction",
      text: "Gazing deep into the river, you are seeking inspiration that won’t come. You feel the desire to manifest your energy. On the surface, it may appear that the time is right to start a new project. Before being swept away, use your intuition to look deeper. Are your motivations pure? Do you have the resources you need to be successful? There’s no blame for a period of cool down, no shame in not burning with full force at all times."
    }
  },
  "Three of Wands": {
    upright: {
      title: "sustained growth • foresight • progress",
      text : "After the initial whoosh of intensity, thoughtful maintenance is required to keep a fire burning. Painstaking placement of the kindling will nurture the flames into longevity. So too must an incipient vision be fed and sustained. Your idea is starting to catch. Don’t rage into a blaze or douse yourself unnecessarily with doubt or dismay. Small victories and careful progress suggest you are succeeding."
    },
    reversed: {
      title: "external obstacles • lack of foresight • delays",
      text: "Sometimes, no matter how carefully you arrange the kindling, a fire just won’t light. It defies your efforts and stubbornly remains a cold, lifeless pile of wood and ash. Continuing this effort will only exhaust you, and your vision of the crackling, healing blaze is just not meant to be. Reevaluate your strategy and take a different approach. There are a lot of ways to get warm, and if this isn’t working for you, dust off your hands and walk away."
    }
  },
  "Four of Wands": {
    upright: {
      title: "celebration • peace • family",
      text: "This card is the first milestone in the journey of the Wands. Everything is coming together nicely, and while things are supporting themselves, take this time to enjoy the success of what you have wrought so far. This is a time of great peace and contentment. It may include family, or a landmark in your life celebrated by ceremony. At the very core it is happiness- one of those rare times when life is going your way, and you’re aware enough to appreciate it."
    },
    reversed: {
      title: "abandoning plans • learn from mistakes • re-imagine",
      text: "The Four of Wands, typically so well-balanced, appears to be swaying precariously, a possible portent of chaos to come. Smoke seems to drift listlessly out of the unstable structure into the sky. What promised to be an immovable pillar is on the verge of collapse, and you are now deciding whether to shore up the scaffolds or let it cave in. You may need to distance yourself from the toppling rubble, and from afar, try to assess what went wrong. What needed more support? What was underutilized? Accept that this project was not a success, but you have an opportunity to learn from your mistakes and build something more sustainable with your hard-earned expertise."
    }
  },
  "Five of Wands": {
    upright: {
      title: "conflict • tension • compromise",
      text: "As your idea grows and develops, you are bound to run up against some conflicting ideas and personalities. Rather than clinging to your vision of the future, humbly take heed of these numerous possibilities. Without ceding complete control, find ways to incorporate others’ visions in your own. Be flexible. Be accommodating. Be free."
    },
    reversed: {
      title: "avoid conflict • losing battle • self defeat",
      text: "The Five of Wands is a card of hostility and gridlock; its inverted position will deescalate and set you free. Disengage. Even if you are rankled, try not to argue and seek compromise when you can. Not everything is worth a fight. If conflict is unavoidable, brace yourself for your possible defeat, because you may be coming from a more disadvantaged place. Keep your head down and tend to your basic needs. Get some rest. Eat well. Spend some quality time with your loved ones. Do your best to avoid toxicity. Unclench your fist and let go."
    }
  },
  "Six of Wands": {
    upright: {
      title: "small victory • self confidence • appreciation",
      text: "Fighting for your vision can be a worthy but exhausting endeavor. If you don’t take the time to appreciate how far you’ve come, you may very well burn out before you reach the final culmination your vision. As you inexorably float toward the next set of difficulties, pause in the present moment and take in all the beauty around you. You have accomplished much, and you have been granted a brief view of the Elysium that awaits you at the end of your journey."
    },
    reversed: {
      title: "stalled movement • unfinished business • adjust focus",
      text: "Escape beckons, calling you toward the illuminated horizon. Unfortunately, you haven’t reached victory yet. You have some unfinished business forestall.ing the true fulfillment of your endeavors. Shift your focus from dreams of the future onto the task at hand. You will achieve your goals in due time: stay the course and appreciate the value of incremental change. Victory is not far off."
    }
  },
  "Seven of Wands": {
    upright: {
      title: "challenge • perseverance • staying the course",
      text: "The spotlight is on you. You must be resolute in the face of adversity. Your vision is really worth something, and it is up to you to navigate the treacherous terrain that will bring it to fruition. You are nimble, skillful, and the iridescent tendrils of your idea will guide you down the correct path. Stick to the plan- if you can navigate through this challenging time, there will be no stopping you."
    },  
    reversed: {
      title: "exhaustion • doubt • distractions",
      text: "hough the path you must take may be clear, it will require all your agility and grace to traverse the tiny footholds. Just look one step ahead. If you are taking a leap of faith in less than ideal circumstances, clear your mind of doubt and distractions and let instinct guide your way. Remember, even if you are adept at navigating a challenging path, you may find luck is not on your side, and you run the risk of plunging into the waters below. Look within and decide if setting out on this demanding journey is worth your time and resources."
    }
  },
  "Eight of Wands": {
    upright: {
      title: "forward movement • finish line • final push",
      text: "You may be tired but there’s no stopping now- nearing the finish line is no time to slow down. Your situation demands one final burst of energy to propel you into victory. Show hustle. Don’t hesitate. You’re nearly there."
    },
    reversed: {
      title: "feeling trapped • frustration • unyielding obstacles",
      text: "The Eight of Wands propels you forward; its inversion may stop you in your tracks. Opaque, unyielding trees thwart your path and throw your progress into confusion. Peering through the branches as if they’re prison bars, you may still feel the call to action beckoning you forward and out of the dark woods. Resist the urge to plough forward and farther into the dense thicket. Take a breath and acknowledge the limitations beyond your control. If you are trapped where you are, look within. What barriers and walls are no longer serving you?"
    }
  },
  "Nine of Wands": {
    upright: {
      title: "endurance • maintaining control • resilience",
      text: "The good news is that your idea is finally starting to take off- it no longer needs your constant care and attention to survive on. In fact, it’s so successful, it’s quickly growing beyond your control. As daunting as it may seem, you must throw yourself into maintaining it, as there will be many unforeseen challenges to monitor and train. Your final test is overcoming the vision itself."
    },
    reversed: {
      title: "overwhelmed • struggle • halted movement",  
      text: "You have pressed farther into the murky woods, and as the sun descends, you now find yourself in unfamiliar territory. You have been overtaken by undergrowth, preventing not only your way forward but also your retreat back. If you are having a hard time moving on, it’s time to stop forcing the issue. The work at hand is more delicate than you anticipated, and will take more time than you had originally planned. Your situation will change a little at a time, until one day you’ll look back and realize you’re out of the shadowy vale."
    } 
  },
  "Ten of Wands": {
    upright: {
      title: "burden • responsibility • commitment",
      text: "After a harrowing journey fraught with danger and conflict, you’ve accomplished what you set out for. But take caution from the furrowed brow of our hero. His hard work has not brought him more happiness- merely more labor. This is the downside of leadership. When you have proven your mettle, you are given freer rein and greater responsibilities. You may be overburdened, eager to shed the weight. Will you carry on in your endeavor, or yield control of it to others? Which is best for you?"
    },
    reversed: {
      title: "over burdened • need for release • carrying weight",
      text: "The Ten of Wands is a surprisingly joyless card considering it’s the completion of a creative cycle. Its inversion suggests you are struggling with some burden, perhaps one that is no longer yours to bear. What are you responsible for? Have you taken on too much, depriving someone of a charge that is rightly someone else’s? It may feel like you are helping, but take care that you are not a martyr without cause. Look within. If it is the opposite, and you have been shirking your duties, it’s time to pick up the slack. Don’t rely on other people to fulfill your obligations. Search your heart and ask yourself if you have taken on too much or too little."
    }
  },
  "Page of Wands": {
    upright: {
      title: "inspiration • enthusiasm • potential",
      text: "When you see the Page of Wands in a reading, you are about to set out on a journey of the mind. You have been struck with some nov.el or wonderful idea, and you have the naive, unfettered enthusiasm of a child to catalyze it. Take risks like you’ve never been hurt. Believe wholeheartedly in something. Your divine vibrancy will bring your vision to life. Your courage and passion will see it to completion."
    },
    reversed: {
      title: "forcing inspiration • discipline • self limiting",
      text: "In its inverted form, the Page appears to be cast backwards, expelled from the earth and headed for a rough landing. Creativity, passion, joy... you may have a conflicted relationship with the elements that stoke your inner fire. You are seeking inspiration in vain. What doesn’t come naturally needn’t be forced. Instead, refine the skills you already have. Delight in discipline and experience. Hold space for yourself until you are more grounded and at peace."
    }
  },
  "Knight of Wands": {
    upright: {
      title: "confidence • surge of energy • passion",
      text: "The Knight of Wands may portend of a surge in confidence and energy, the fire catching from the spark of the Page. But do not depend on the initial fervent swell to see you through to the end; ultimately, a disciplined strategy will pay greater dividends than a short-lived burst of enthusiasm. Focus on the vision at hand, and ask yourself if you are being passionate or merely brash."
    },
    reversed: {
      title: "lacking confidence • blocked energy • hasty",
      text: "Knights charge forth, equal parts valor and foolhardiness. However, if this energy is blocked, you may feel listless stagnation is festering within. Particularly in the fiery suit of wands, a lack of ambition and momentum can be very frustrating, forcing you to stay put when you’d much rather be moving on. Try not to do anything rash. Let your basest impulses rest, and find comfort in a quiet, quotidian existence. Shore up your strength. Practice mindfulness."
    }
  },
  "Queen of Wands": {
    upright: {
      title: "charisma • radiating energy • inspirational",
      text: "The Queen of Wands is the vibrant expression of a brimming mind. Sunlit, exuberant, she takes all the positive energy of fire and warms the world with it, radiating confidence and charisma. Her joyful dis.play is infectious, inspiring positivity in others. As a result, she is a respected, productive leader. When you see her come up in a reading, consider how you can incorporate her enlivening energy into your life."
    },
    reversed: {
      title: "trapped energy • self control • need for recentering",
      text: "A powerful energy has trapped you in its tendrils, and you are writhing ineffectually, trying to break free. Forces beyond your control are wreaking havoc on what you hold dear. You may find it difficult to maintain your composure, as what began as untampered joy has been transformed into roiling turmoil. Just close your eyes and let go. Let yourself be buffeted as you practice detachment. This is a temporary condition. Cultivate a presence of mind that will see you through to the end of the turbulence."
    }
  },
  "King of Wands": {
    upright: {
      title: "creative leader • visionary • passionate",
      text: "Patron deity of the pursuit of passion, you need only to embody the King’s indomitable spirit to give yourself direction and purpose. Creative, bold, and outgoing, he commands attention through his radiant presence, a man who is truly alive. When you see him in a reading, consider how you might take charge by inspiring others. Unremittingly follow your passions."
    },
    reversed: {
      title: "egotistic • high expectations • taking a step back",
      text: "The King of Wands is truly anointed- every human at their best- but its inversion reminds you to keep yourself in check. Take care that your ego is not superseding your larger vision or deadening your empathetic connection toward others. If you have lost sight of what’s important, take a step back. Let others take the lead. You have a lot of raw, potential energy, but it’s not quite ready to see the light of day. Gaze within. There is self-work to be done before you bring your gifts to the World."
    }
  } 
};

function openCardModal(cardIndex) {
  const cardName = cardNames[cardIndex - 1];

  const modalCardImage = document.getElementById('modal-card-image');
  const cardModal = document.getElementById('card-modal');
  const cardFlipWrapper = document.querySelector('.card-flip-wrapper');
  const modalCardName = document.getElementById('modal-card-name');

  modalCardName.textContent = cardName;
  modalCardImage.src = `images/card${cardIndex}.png`;
  modalCardImage.style.transform = 'rotate(0deg)';
  void modalCardImage.offsetWidth;
  modalCardImage.classList.add('zoom-appear');

  cardModal.style.display = 'flex';
  cardFlipWrapper.classList.remove('reversed');

  cardModal.dataset.cardIndex = cardIndex;
  cardModal.dataset.cardName = cardName;
  cardModal.dataset.orientation = 'upright';

  updateDescription(cardName, 'upright');

  document.getElementById('deck-grid').style.display = 'none';
}

function updateDescription(cardName, orientation) {
  const normalized = cardName.trim();
  const meaning = cardMeanings[normalized]?.[orientation]; // <-- This line is missing in your code!
  if (meaning && meaning.title && meaning.text) {
    cardDescription.innerHTML = `
      <p><b>${meaning.title}</b></p>
      <p>${meaning.text}</p>
    `;
  } else {
    cardDescription.innerHTML = `<p>Pas de description pour cette carte.</p>`;
  }
}

btnUpright.addEventListener('click', () => {
  cardFlipWrapper.classList.remove('reversed');
  updateDescription(cardModal.dataset.cardName, 'upright');
});

btnReversed.addEventListener('click', () => {
  cardFlipWrapper.classList.add('reversed');
  updateDescription(cardModal.dataset.cardName, 'reversed');
});


// Fermer modal au clic sur lumière
document.querySelector('.modal-backdrop').addEventListener('click', () => {
  cardModal.style.display = 'none';
  document.getElementById('deck-grid').style.display = 'grid';
});

cardModal.addEventListener('click', (e) => {
  // Si on clique sur le fond noir, pas sur le contenu
  if (!e.target.closest('.modal-content')) {
    cardModal.style.display = 'none';
    document.getElementById('deck-grid').style.display = 'grid';
  }
});


const bgMusic = document.getElementById('bg-music');
const cardSound = document.getElementById('card-sound');

function startMusic() {
  if (bgMusic && bgMusic.paused) {
    bgMusic.volume = 0.5;
    bgMusic.play();
  }
}

function playCardSound() {
  if (cardSound) {
    cardSound.currentTime = 0;
    cardSound.volume = 0.7;
    cardSound.play();
  }
}

