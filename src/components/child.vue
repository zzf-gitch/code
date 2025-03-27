<template>
    <div class="child">
        <el-dialog :model-value="modelValue" title="Warning" width="500" align-center @close="updateModelValue(false)">
            <RootNav :list="navList" />
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="updateModelValue(false)">Cancel</el-button>
                    <el-button type="primary" @click="download">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, defineProps , nextTick } from 'vue'
import axios from 'axios';
const props = defineProps({
    modelValue: Boolean
})
const emit = defineEmits(['update:modelValue'])
/** 更新modelValue */
const updateModelValue = (value) => {
    emit('update:modelValue', value);
};

const navList = ref([
    {
        name: '一级导航 1'
    },
    {
        name: '一级导航 2',
        children: [
            { name: '二级导航 2-1' },
            {
                name: '二级导航 2-2',
                children: [
                    { name: '三级导航 2-2-1' },
                    { name: '三级导航 2-2-2' },
                ]
            },
            { name: '二级导航 2-2' }
        ]
    },
    {
        name: '一级导航 3'
    }
])

const pdf = '/test.pdf'
const download = () => {
    fetch(pdf).then(response => {
        response.blob().then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            let fname = 'test.pdf';
            link.href = url;
            link.setAttribute('download', fname);
            document.body.appendChild(link);
            link.click();
            nextTick(() => {
                // 跳转页面并打印
                window.open(pdf,'_blank').print()
                // 本页面打印
                window.print()
            })
        });
    });
    // axios.get('test.pdf', {
    //     responseType: 'blob',
    // }).then(response => {
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement('a');
    //     let fname = 'test.pdf';
    //     link.href = url;
    //     link.setAttribute('download', fname);
    //     document.body.appendChild(link);
    //     link.click();
    // });
    updateModelValue(false);
}
</script>