# Iris Recognition
------

autor: Jakub Lamprecht

## Wymagania
------

### Aplikacja Python

* Python (wersja 3.7.3)
* Pip
* pipenv, version 2018.11.26 [Link](https://pipenv-fork.readthedocs.io/en/latest/)

### Aplikacja kliencka

* NodeJS (LTS version) - wersja v10.14.2 [Link](https://nodejs.org/en/)
* Yarn - wersja 1.5.2 [Link](https://yarnpkg.com/en/docs/install#windows-stable)

## Instrukcja obsługi

### Aplikacja python

Aplikacja używa środowiska wirtualnego wygenerowanego przez *pipenv*. Zawiera ono
wersję pythona oraz wszystkie potrzebne paczki (Numpy, OpenCV itd).

Aby rozpocząc pracę z aplikacją należy uruchomic w katalogu *server* komendę:
```
pipenv install
```
która stworzy wirtualne środowisko i zainstaluje wymagane paczki.

W celu instalacji nowych paczek należy w katalogu *server* uruchomic komendę:
```
pipenv install <packageName>
```
Zainstaluje ona paczkę korzystając z managera pip.

W celu uruchomienia aplikacji najpierw należy aktywowac srodowisko wirtualne komendą:
```
pipenv shell
```

Następnie należy odpalic serwer komendą
```
python run engine.py
```

Uruchamia ona aplikację w trybie niezezwalajacym na debugowanie. W repozytorium dodany został plik z konfiguracją skryptu uruchamiającego tryb debugowania w aplikacji Visual Studio Code.

### Aplikacja JS

Przed uruchomieniem aplikacji należy uruchomic aplikację Pythonową, w innym przypadku przetwarzanie obrazu nie zadziała. W pliku *package.json* znajdują się
dependencje projektu oraz skrypty odpalające budowanie aplikacji. W celu zbudowania
aplikacji należy uruchomic komendę:

```
yarn build
```

Buduje ona jedynie kod, nie odpala aplikacji. W celu uruchomienia aplikacji należy
wywołac:

```
yarn app:start
```

W celach developerskich stworzony został skrypt pozwalający na automatyczne przeładowywanie aplikacji w momencie zapisania zmian kodu. W celu jego uruchomienia należy wywołac komendę:

```
yarn dev
```

W przypadku pracy w trybie deweloperskim polecam zakomentowac w pliku `electron.main.js` linie odpowiadające za odpalenie serwera flaska. W innym wypadku problematyczne może byc debugowanie aplikacji serwerowej.

## Uwagi

> **WARNING**: Aplikacja polega na istnieniu folderu serwer pod odpowiednią ścieżką.

> **WARNING**: Aplikacja w trakcie działania zapisuje obrazy w folderze `server/temp`, warto sprawdzic czy na dysku jest wystarczajaco miejsca.

> **WARNING**: Pliki wykonujące eksperyment znajdują się w katalogu `utils` i wymagają istnienia plików `results.json`, `metrics.json`, `config.json`. Config może
byc wygenerowany w trybie krokowym, a pozostale pliki moga byc puste. Korzystają one takze ze spłaszczonej struktury bazy danych CASIA (możliwe do uzyskania w wyniku uruchomienia skryptu `flattenCasia.py`).
