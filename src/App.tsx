import { useState } from 'react';
import { checkWordExists } from './checkWordInDictionary';
import './App.css';

const LANGUAGES = ['English', 'French', 'German', 'Spanish', 'Italian', 'Swedish'];

function App() {
  const [inputWord, setinputWord] = useState('');
  const [searchedWord, setSearchedWord] = useState('');
  const [searchLanguage, setSearchLanguage] = useState('English');
  const [searchedLanguage, setSearchedLanguage] = useState('');
  const [isWordValid, setIsWordValid] = useState<boolean | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsWordValid(null);
    setIsError(false);

    checkWordExists(inputWord.toLowerCase(), searchLanguage).then((result) => {
      setIsWordValid(!!result);
      console.log(`Word "${inputWord.toLowerCase()}" exists in ${searchLanguage}: ${result}`);
    }).catch((error) => {
      console.error('Error checking word existence:', error);
      setIsError(true);
    });
    setSearchedWord(inputWord);
    setSearchedLanguage(searchLanguage);
  };

  return (
    <main>
      <h1>Word Validator</h1>

      <div id="card">
        <p id='info-message'>Powered by Wiktionary - some results might be incorrect</p>
        <form onSubmit={handleSubmit}>
          <span className='card_form-item'>
            <label htmlFor='language-select'>Select language</label>
            <select
              id='language-select'
              value={searchLanguage}
              onChange={(e) => { setSearchLanguage(e.target.value); }}>
              {LANGUAGES.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </span>
          <span className='card_form-item'>
            <label htmlFor='word-search'>Search word</label>
            <input
              id='word-search'
              type='search'
              placeholder='Enter word...'
              value={inputWord} onChange={(e) => { setinputWord(e.target.value); }}
            />
          </span>
          <span className="card_form-item">
            <button type='submit'>Search</button>
          </span>
        </form>
        {isError && (
          <div className='card_message'>
            <p id='error-message'>Error occurred while checking the word existence. Please try again.</p>
          </div>
        )}
        {isWordValid !== null && !isError && (
          <div className='card_message'>
            {isWordValid ? (
              <p id='valid-word'>The word "{searchedWord}" exists in {searchedLanguage}.</p>
            ) : (
              <p id='invalid-word'>The word "{searchedWord}" does not exist in {searchedLanguage}.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
