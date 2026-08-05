<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useGlossaryStore } from '@/stores/glossaryStore.ts';
  import type { IGlossaryModel } from '@/api/types.ts';

  const props = defineProps({
    text: {
      type: String,
      required: true
    }
  });

  interface ITextChunk {
    text: string;
    isTerm: boolean;
    term?: IGlossaryModel | null;
  }

  const glossaryStore = useGlossaryStore();

  const textChunks = ref<ITextChunk[]>([]);

  const escapeRegExp = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const processText = () => {
    const terms = glossaryStore.terms;
    if (!terms.length) {
      textChunks.value = [{ text: props.text, isTerm: false }];
      return;
    }

    const sortedTerms = [...terms].sort((a, b) => b.term.length - a.term.length);

    const result: ITextChunk[] = [];
    let offset = 0;

    while (offset < props.text.length) {
      let bestMatch: { index: number; length: number; term: (typeof sortedTerms)[number] } | null =
        null;

      for (const term of sortedTerms) {
        const regex = new RegExp(
          `(?<![\\p{L}\\p{N}_])${escapeRegExp(term.term)}(?![\\p{L}\\p{N}_])`,
          'giu'
        );
        regex.lastIndex = offset;
        const match = regex.exec(props.text);

        if (
          match &&
          (!bestMatch ||
            match.index < bestMatch.index ||
            (match.index === bestMatch.index && match[0].length > bestMatch.length))
        ) {
          bestMatch = { index: match.index, length: match[0].length, term };
        }
      }

      if (!bestMatch) {
        if (offset < props.text.length) {
          result.push({ text: props.text.substring(offset), isTerm: false });
        }
        break;
      }

      if (bestMatch.index > offset) {
        result.push({
          text: props.text.substring(offset, bestMatch.index),
          isTerm: false
        });
      }

      result.push({
        text: props.text.substring(bestMatch.index, bestMatch.index + bestMatch.length),
        isTerm: true,
        term: bestMatch.term
      });

      offset = bestMatch.index + bestMatch.length;
    }

    textChunks.value = result;
  };

  watch(
    () => [props.text, glossaryStore.terms],
    () => {
      processText();
    },
    { immediate: true }
  );
</script>

<template>
  <v-sheet class="glossary-text" ref="textContainer">
    <span v-for="(chunk, index) in textChunks" :key="index" class="text-chunk">
      <template v-if="chunk.isTerm">
        <v-tooltip
          location="bottom left"
          :offset="[4, -12]"
          max-width="500"
          content-class="elevation-16-dp border-sm"
        >
          <template #activator="{ props }">
            <span v-bind="props" class="text-additional-link">{{ chunk.text }}</span>
          </template>
          <span class="font-smaller">{{ chunk.term?.definition || chunk.term?.term }}</span>
        </v-tooltip>
      </template>
      <template v-else>
        {{ chunk.text }}
      </template>
    </span>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
