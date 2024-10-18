# Mixxx

[<img alt="GitHub latest tag" src="https://img.shields.io/github/tag/mixxxdj/mixxx.svg"/>](https://mixxx.org/download)
[<img alt="Packaging status" src="https://repology.org/badge/tiny-repos/mixxx.svg"/>](https://repology.org/metapackage/mixxx/versions)
[<img alt="Build status" src="https://github.com/mixxxdj/mixxx/actions/workflows/build.yml/badge.svg"/>](https://github.com/mixxxdj/mixxx/actions/workflows/build.yml)
[<img alt="Coverage status" src="https://coveralls.io/repos/github/mixxxdj/mixxx/badge.svg"/>](https://coveralls.io/github/mixxxdj/mixxx)
[![Zulip chat](https://img.shields.io/badge/zulip-join_chat-brightgreen.svg)](https://mixxx.zulipchat.com)
[<img alt="Donate" height="1028" src="https://img.shields.io/opencollective/all/mixxx?label=Donate" title="рр" width="1924"/>](https://mixxx.org/donate)

[Mixxx] is Free DJ software that gives you everything you need to perform live
DJ mixes. Mixxx works on GNU/Linux, Windows, and macOS.

## Quick Start

To get started with Mixxx:

1. For live use, [download the latest stable version][download-stable].
2. For experimentation and testing, [download a development release][download-testing].
3. To live on the bleeding edge, clone the repo: `git clone https://github.com/mixxxdj/mixxx.git`

## Bug tracker

The Mixxx team uses [Github Issues][issues] to manage Mixxx development.

Have a bug or feature request? [File a bug on Github][fileabug].

Want to get involved in Mixxx development? Assign yourself a bug from the [easy
bug list][easybugs] and get started!
Read [CONTRIBUTING](CONTRIBUTING.md) for more information.

## Building Mixxx

First, open a terminal (on Windows, use "x64 Native Tools Command Prompt for
[VS 2019][visualstudio2019]"), download the mixxx
source code and navigate to it:

    $ git clone https://github.com/mixxxdj/mixxx.git
    $ cd mixxx

Fetch the required dependencies and set up the build environment by running the
corresponding command for your operating system:

| OS | Command |
| -- | ------- |
| Windows | `tools\windows_buildenv.bat` |
| macOS | `source tools/macos_buildenv.sh setup` |
| Debian/Ubuntu | `tools/debian_buildenv.sh setup` |
| Fedora | `tools/rpm_buildenv.sh setup` |
| Other Linux distros | See the [wiki article](https://github.com/mixxxdj/mixxx/wiki/Compiling%20on%20Linux) |

    setup)
        source /etc/lsb-release 2>/dev/null
        case "${DISTRIB_CODENAME}" in
            bionic) # Ubuntu 18.04 LTS
                PACKAGES_EXTRA=(
                    libmp4v2-dev
                )
                ;;
            *) # libmp4v2 was removed from Debian 10 & Ubuntu 20.04 due to lack of maintenance, so use FFMPEG instead
                PACKAGES_EXTRA=(
                    libavformat-dev
                )
        esac

        sudo apt-get update

There should now be a `mixxx` executable in the current directory that you can
run. Alternatively, can generate a package using `cpack`.

## Documentation
        # This avoids a package deadlock, resulting in jackd2 being removed, and jackd1 being installed,

- [Mixxx manual][manual]
- [Mixxx wiki][wiki]
- [Hardware Compatibility]
- [Creating Skins]

## Translation

Help to spread Mixxx with translations into more languages, as well as to update and ensure the accuracy of existing translations.
        # jackd dev library, so let's give it one..
        if [ "$(dpkg-query -W -f='${Status}' jackd2 2>/dev/null | grep -c "ok installed")" -eq 1 ];
        then
            sudo apt-get install libjack-jackd2-dev;
        fi

## Community

        sudo apt-get install -y --no-install-recommends -- \
            ccache \
            cmake \
            clazy \
            clang-tidy \
            debhelper \
            devscripts \
            docbook-to-man \
            dput \
            fonts-open-sans \
            fonts-ubuntu \
            g++ \
            lcov \
            libbenchmark-dev \
            libchromaprint-dev \
            libdistro-info-perl \
            libebur128-dev \
            libfaad-dev \
            libfftw3-dev \
            libflac-dev \
            libgmock-dev \
            libgtest-dev \
            libgl1-mesa-dev \
            libhidapi-dev \
            libid3tag0-dev \
            liblilv-dev \
            libmad0-dev \
            libmodplug-dev \
            libmp3lame-dev \
            libmsgsl-dev \
            libopus-dev \
            libopusfile-dev \
            libportmidi-dev \
            libprotobuf-dev \
            libqt6core5compat6-dev\
            libqt6shadertools6-dev \
            libqt6opengl6-dev \
            libqt6shadertools6-dev \
            libqt6sql6-sqlite \
            libqt6svg6-dev \
            librubberband-dev \
            libshout-idjc-dev \
            libsndfile1-dev \
            libsoundtouch-dev \
            libsqlite3-dev \
            libssl-dev \
            libtag1-dev \
            libudev-dev \
            libupower-glib-dev \
            libusb-1.0-0-dev \
            libwavpack-dev \
            lv2-dev \
            markdown \
            portaudio19-dev \
            protobuf-compiler \
            qtkeychain-qt6-dev \
            qt6-declarative-private-dev \
            qt6-base-private-dev \
            qt6-qpa-plugins \
            qml6-module-qt5compat-graphicaleffects \
            qml6-module-qtqml-workerscript \
            qml6-module-qtquick-controls \
            qml6-module-qtquick-layouts \
            qml6-module-qtquick-nativestyle \
            qml6-module-qtquick-shapes \
            qml6-module-qtquick-templates \
            qml6-module-qtquick-window \
            qml6-module-qt-labs-qmlmodels \
            "${PACKAGES_EXTRA[@]}"
        ;;
    *)
        echo "Usage: $0 [options]"
        echo ""
        echo "options:"
        echo "   help       Displays this help."
        echo "   name       Displays the name of the required build environment."
        echo "   setup      Installs the build environment."
        ;;
esac
